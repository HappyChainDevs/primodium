import { EntityID, defineComponentSystem } from "@latticexyz/recs";
import { world } from "../world";
import {
  Battle,
  Account,
  NotificationQueue,
  BlockNumber,
} from "../components/clientComponents"; // Update with actual Battle and Player component imports
import { Notification } from "../components/customComponents/NotificationQueueComponent";
import { Arrival } from "../components/chainComponents";

const LENGTH = 3500;

export function setupNotificationQueue() {
  defineComponentSystem(world, Battle, (update) => {
    const playerAddress = Account.get()?.value; // Assuming Player component has an 'address' field
    const battle = update.value[0];
    if (!battle) return;
    if (
      battle.attacker === playerAddress ||
      battle.defender === playerAddress
    ) {
      const newNotification: Notification = {
        id: world.entities[update.entity],
        timestamp: Date.now(),
        type: "battle",
      };

      NotificationQueue.addNotification(newNotification);
    }
  });

  const usedArrivals = new Set<EntityID>();
  defineComponentSystem(world, Arrival, (update) => {
    const playerAddress = Account.get()?.value; // Assuming Player component has an 'address' field
    if (!playerAddress) return;
    const entityId = world.entities[update.entity];
    if (usedArrivals.has(entityId)) return;
    usedArrivals.add(entityId);
    const arrival = Arrival.getWithId(entityId);
    if (arrival?.from === playerAddress || arrival?.to === playerAddress) {
      const newNotification: Notification = {
        id: world.entities[update.entity],
        timestamp: Date.now(),
        type: "arrival-transit",
      };

      NotificationQueue.addNotification(newNotification);
    }
  });

  defineComponentSystem(world, BlockNumber, () => {
    const currentTime = Date.now();
    const notifications = NotificationQueue.get();
    notifications?.id.forEach((id, index) => {
      const timestamp = notifications.timestamp[index];
      if (currentTime - timestamp >= LENGTH) {
        NotificationQueue.removeNotification(id);
      }
    });
  });
}
