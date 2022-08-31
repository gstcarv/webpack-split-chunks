import { lazy, Suspense, useState } from "react";

const ComponentA = lazy(() => import("./components/ComponentA"));
const ComponentB = lazy(() => import("./components/ComponentB"));

export function App() {
    const [showWhat, setShowWhat] = useState<"A" | "B" | null>(null);

    return (
        <div>
            <button onClick={() => setShowWhat("A")}>Show A</button>
            <button onClick={() => setShowWhat("B")}>Show B</button>

            <br />

            <Suspense>
                {showWhat === "A" && <ComponentA />}

                {showWhat === "B" && <ComponentB />}
            </Suspense>
        </div>
    );
}
