import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();

  return (
    <>
      <Html>
        <div className="font-black text-white">{progress.toFixed(0.2)}%</div>
      </Html>
    </>
  );
}
