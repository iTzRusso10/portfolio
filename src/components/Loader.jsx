import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const { active, progress } = useProgress();

  return (
    <>
      {active && (
        <Html>
          <div
          className="text-white font-black"
          >{progress.toFixed(0.2)}%</div>
        </Html>
      )}
    </>
  );
}
