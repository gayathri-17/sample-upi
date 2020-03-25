/**
 *
 * @param {Any} tree - The param must be any instance of a component/view
 * @param {*} testID - It must be a string param which needs to be matched with an ID for the child of tree param
 * returns props of matched component, otherwise the result will be undefined
 */
export let findById = function(tree, testID) {
  if (tree.props && tree.props.testID === testID) {
    return tree
  }
  if (tree.children && tree.children.length > 0) {
    let childs = tree.children
    for (let i = 0; i < childs.length; i++) {
      // recursive call triggers to find child component
      let item = findById(childs[i], testID)
      if (typeof item !== 'undefined') {
        return item
      }
    }
  }
}
