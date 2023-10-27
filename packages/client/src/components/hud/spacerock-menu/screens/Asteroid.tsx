import { Navigator } from "src/components/core/Navigator";
import { Header } from "../widgets/Header";
import { getSpaceRockInfo } from "src/util/spacerock";
import { Raid } from "../widgets/Raid";
import { Reinforce } from "../widgets/Reinforce";
import { AsteroidResource } from "../widgets/AsteroidResource";
import { Land } from "../widgets/Land";

export const Asteroid: React.FC<{
  data: ReturnType<typeof getSpaceRockInfo>;
}> = ({ data }) => {
  return (
    <Navigator.Screen title={data.entity} className="w-full">
      <Header name={data.name} imageUri={data.imageUri} />
      <AsteroidResource resources={data.resources} />
      <div className="grid grid-cols-2 w-full">
        <Raid />
        <Reinforce />
      </div>
      <Land destination={data.entity} rockType={data.type} />
    </Navigator.Screen>
  );
};
