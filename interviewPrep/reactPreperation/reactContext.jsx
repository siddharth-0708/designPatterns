/*
1️⃣ What React Context is
React Context is a mechanism to share data across a component tree without passing props manually at every level. A context object created with createContext(defaultValue) stores a current value that can be provided by a Provider and consumed by any descendant using useContext. It’s mainly used for global-like data such as theme, authentication, or configuration.

2️⃣ Role of Provider in scoping values
When React renders a <Context.Provider value={...}>, it temporarily activates that value for everything rendered inside its subtree. Internally, React saves the previous value, sets the new one, renders the children, and then restores the previous value after finishing that subtree. Because of this scoped activation, only components rendered inside the Provider receive the provided value.

3️⃣ How useContext reads the value
useContext(Context) does not search parent components or traverse the tree. Instead, during rendering React maintains the currently active value for each context. When a component calls useContext, React simply returns that active value. If no Provider was rendered above, React returns the default value from createContext.

4️⃣ Why only children get access
Access is controlled by render order, not by checking relationships. React renders parent → activates context → renders children → restores previous value. Since the context value exists only while children are being rendered, components outside that subtree never see it. Nested Providers override values temporarily, so the nearest Provider always wins.

5️⃣ How updates propagate
When a Provider’s value changes, React tracks which components previously read that context and schedules them to re-render. This avoids prop drilling while keeping updates predictable. Context is tree-scoped state managed internally by React’s rendering system, not a global variable, which is why multiple contexts remain isolated and don’t collide.
*/

//PSEDO CODE
// ===== createContext =====
function createContext(defaultValue) {
    return {
      currentValue: defaultValue,
      valueStack: []
    };
  }
  
  // ===== useContext =====
  function useContext(context) {
    return context.currentValue;
  }
  
  // ===== Provider render logic =====
  function renderProvider(context, newValue, renderChildren) {
    // save previous value
    context.valueStack.push(context.currentValue);
  
    // activate provider value
    context.currentValue = newValue;
  
    // render subtree
    renderChildren();
  
    // restore previous value
    context.currentValue = context.valueStack.pop();
  }
  
  // ===== simple component renderer =====
  function renderComponent(componentFn) {
    componentFn();
  }
  