import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import Product from "./Product";
import VariantOption from "./VariantOption";

@Entity()
export default class Variant extends BaseEntity {
  @Column()
  name: string;

  @Column()
  productId: number;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn()
  product: Product;

  @OneToMany(() => VariantOption, (variantOption) => variantOption.variant)
  options: VariantOption[];
}
