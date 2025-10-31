import { faker } from "@faker-js/faker";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/beta")({
  component: RouteComponent,
});

function RouteComponent() {
  const words = Array.from({ length: 50 }, () => faker.book.genre());
  // console.log(words);
  //  Array.from({ length: count }, () => faker.helpers.arrayElement(arr))

  return (
    <>
    
        <main className="transition-all duration-500 relative w-screen h-screen overflow-hidden bg-black">
      {words.map((item, idx) => {
        const top = Math.floor(Math.random() * 95);   // %
        const left = Math.floor(Math.random() * 95);  // %
        const opacity = Math.floor(Math.random() * 9) / 10; // 0.0 - 0.9
        const rotate = Math.floor(Math.random() * 30) - 15; // -15deg to +15deg

        return (
          <span
            key={idx}
            className="absolute text-white uppercase tracking-wider text-xs font-mono"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              opacity: opacity,
              // transform: `rotate(${rotate}deg)`,
            }}
          >
            {item}
          </span>
        );
      })}
    </main>
    </>
  );
}
