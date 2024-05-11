import { Progress } from "../core/Progress";

export const Initializing = () => (
  <>
    <div className="absolute w-full h-full" />
    <div className="flex flex-col items-center gap-4 h-screen justify-center">
      <p className="text-lg text-white">
        <span className="">Initializing</span>
        <span>&hellip;</span>
      </p>
      <Progress value={100} max={100} className="animate-pulse w-48" />
    </div>
  </>
);
