import bcrypt from "bcrypt";
import { FindOptionsWhere } from "typeorm";
import { IncorrectPasswordError } from "../errors/auth.error";
import { UserAlreadyExistsError, UserNotFound } from "../errors/user.error";
import User from "../models/User";
import { SafeUserResource } from "../resources/safeUser.resource";
import hashPassword from "../utils/hashPassword";
import BaseService from "./BaseService";

export default class UserService extends BaseService {
  async createUser(options: {
    username: string;
    password: string;
    email: string;
    name: string;
  }): Promise<SafeUserResource> {
    await this.checkAttributeUniqueness({
      attribute: "username",
      value: options.username,
    });
    await this.checkAttributeUniqueness({
      attribute: "email",
      value: options.email,
    });

    const user = new User();
    user.username = options.username;
    user.passwordHash = await hashPassword(options.password);
    user.email = options.email;
    user.name = options.name;
    await user.save();

    return this.mapSafeUserResource(user);
  }

  async getUserById(options: { id: number }): Promise<SafeUserResource> {
    const user = await User.findOne({ where: { id: options.id } });
    if (!user) UserNotFound({ attribute: "ID", value: options.id });
    return this.mapSafeUserResource(user);
  }

  async updateUser(options: {
    id: number;
    username?: string;
    email?: string;
    name?: string;
  }): Promise<SafeUserResource> {
    const user = await User.findOne({ where: { id: options.id } });
    if (!user) UserNotFound({ attribute: "ID", value: options.id });

    if (options.username && options.username !== user.username) {
      await this.checkAttributeUniqueness({
        attribute: "username",
        value: options.username,
      });
      user.username = options.username;
    }

    if (options.email && options.email !== user.email) {
      await this.checkAttributeUniqueness({
        attribute: "email",
        value: options.email,
      });
      user.email = options.email;
    }

    if (options.name) user.name = options.name;

    await user.save();
    return this.mapSafeUserResource(user);
  }

  async changePassword(options: {
    id: number;
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    const user = await User.findOne({ where: { id: options.id } });
    if (!user) UserNotFound({ attribute: "ID", value: options.id });

    const isPasswordCorrect = await bcrypt.compare(
      options.oldPassword,
      user.passwordHash
    );
    if (!isPasswordCorrect) IncorrectPasswordError();

    user.passwordHash = await hashPassword(options.newPassword);
    await user.save();
  }

  async checkAttributeUniqueness(options: {
    attribute: "username" | "email";
    value: string;
  }): Promise<boolean> {
    const whereFilter: FindOptionsWhere<User> = {};
    options.attribute === "username"
      ? (whereFilter.username = options.value)
      : (whereFilter.email = options.value);

    const user = await User.findOne({ where: whereFilter });
    if (user)
      UserAlreadyExistsError({
        attribute: options.attribute,
        value: options.value,
      });

    return true;
  }
}
