const handlerBasicFields = ({ featured, company, name }) => {
  let queryObj = {}

  if (featured) {
    queryObj.featured = featured
  }
  if (company) {
    queryObj.company = company
  }
  if (name) {
    queryObj.name = { $regex: name, $options: 'i' }
  }

  return queryObj
}

const handlerSort = ({ sort, fieldDefault }) => {
  return sort ? sort.trim().split(',').join(' ') : fieldDefault
}

const handlerSelect = ({ select }) => {
  return select && select.trim().split(',').join(' ')
}

const handlerNumericFilters = ({ numericFilters, queryObj }) => {
  if (numericFilters) {
    const operatorMap = {
      '<': '$lt',
      '<=': '$lte',
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq'
    }

    const regExp = /\b(<|<=|>|>=|=)\b/g

    let filters = numericFilters.replace(
      regExp,
      (match) => `-${operatorMap[match]}-`
    )

    const options = ['price', 'rating']
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.trim().split('-')
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) }
      }
    })
  }
  return queryObj
}

module.exports = {
  handlerSort,
  handlerSelect,
  handlerBasicFields,
  handlerNumericFilters
}
