import { useActor as useCaffeineActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { BackendActor } from "../types";

type ActorResult = {
  actor: BackendActor | null;
  isFetching: boolean;
};

export function useActor(): ActorResult {
  const { actor, isFetching } = useCaffeineActor(createActor);
  return { actor: actor as unknown as BackendActor | null, isFetching };
}
