/*
Without keys, React tracks list items by position. It treats “whatever is in position 1” as the same component as before, “position 2” as the same as before, and so on. So when your list changes from A–B–C to C–B–A, React keeps the same components in those positions and only changes what they display. The component that was in position 1 still exists — it just shows C now. That means any memory that belonged to the component in position 1 stays there, even though the item changed.

With keys, React stops thinking about positions and starts thinking about identity. Each item gets a stable label (like A, B, C), and React tracks the component that belongs to that label. When the order changes, React moves the correct component to the new position instead of reusing the wrong one. So the component that belongs to A stays A’s component wherever it appears in the list.

The simple rule to remember is: without keys, memory sticks to positions; with keys, memory sticks to items. Re-rendering only updates what you see, but keys ensure each item keeps the correct component and internal state even when positions change.


React keys are like identity cards for list items. When a list renders, React must decide which component is the same as before and which is new. If you don’t give keys, React assumes “item in position 1 is the same as before,” so when you reverse the list it keeps the same component instances but just changes their props. That can silently mix up identity: the UI text updates, but the component’s internal memory stays tied to its old position.

In your example, each MyList stores a random number when it is created. That number represents the component’s internal state — its memory. When you use key={item}, React tracks items by their identity (“A”, “B”, “C”) instead of by position. So when the list reverses, React moves the correct component instances instead of reusing the wrong ones. The random number stays with the same item, which proves the identity stayed correct.

The simple rule to remember: Re-render updates what you see; keys protect who each component really is. Without keys, React may reuse the wrong component for a different item, which can mix up state, effects, or behavior. With stable keys, each item keeps its own component and memory, even if the order changes.

Using an index as a key causes the same identity problem as not using a key, because an index represents a position, not the actual item. When the list order changes (like reversing, inserting, or deleting), items move to new positions but their index keys change, so React keeps component instances tied to positions instead of items. This means the internal memory of a component stays in the same spot while different data appears there, leading to state and behavior sticking to the wrong item. In simple terms: index keys track seats, not people — and when people change seats, React gets confused.
*/
import "./styles.css";

import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState(["A", "B", "C"]);

  function reverseList() {
    setItems([...items].reverse());
  }

  return (
    <div>
      <button onClick={reverseList}>Reverse</button>

      <ul>
        {items.map((item) => (
          <MyList key={item} item={item} /> //Key is important
        ))}
      </ul>
    </div>
  );
}

function MyList({ item }) {
  const [id] = useState(() => Math.random());
  return (
    <li>
      {item} — {id}
    </li>
  );
}
