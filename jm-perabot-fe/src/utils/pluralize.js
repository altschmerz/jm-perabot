// This is our own limited hashmap of singular to plural nouns.
// This utility function is useful for mapping
// resource type to their reducers.
const pluralize = (singularWord) => {
  switch (singularWord) {
    case 'user':
      return 'users'

    case 'product':
      return 'products'

    default:
      throw new Error(
        `we currently do not have a plural form of "${singularWord}". Please add the plural form into the dictionary in /utils/pluralize.js`
      )
  }
}

export default pluralize
