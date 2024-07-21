# To Do

## Fixes

- The `stock` attribute in product need to be adjusted. If product does not have variant, then the stock is attached to the product. If the product has variants, the stock needs to be kept with the combinations of variants. e.g. Red size S stock 3, Blue size S stock 5, Red size M stock 1 etc. Needs to do more research on this.

## Tests

- Currently setting up

## Improvements

- User vs SafeUser. Check return value for each cases.
- Middlewares + self user check in services
- CREATED vs OK: when to use which

## Need Checking

- `{ session: false }` in passport login, what's it for? Do we need it?
