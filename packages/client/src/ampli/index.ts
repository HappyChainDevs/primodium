/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull web'
 *
 * Required dependencies: @amplitude/analytics-browser@^1.3.0
 * Tracking Plan Version: 1
 * Build: 1.0.0
 * Runtime: browser:typescript-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/primodium/primodium-testnet2/implementation/web)
 */

import * as amplitude from '@amplitude/analytics-browser';

export type Environment = 'prod' | 'dev';

export const ApiKey: Record<Environment, string> = {
  prod: '3a2d21394a5536c8bc7e05efe4d9315e',
  dev: '3536d68c8547831654db7736a5898114'
};

/**
 * Default Amplitude configuration options. Contains tracking plan information.
 */
export const DefaultConfiguration: BrowserOptions = {
  plan: {
    version: '1',
    branch: 'main',
    source: 'web',
    versionId: '8f0c2168-550a-4531-bc6b-f48fc69bf49e'
  },
  ...{
    ingestionMetadata: {
      sourceName: 'browser-typescript-ampli',
      sourceVersion: '2.0.0'
    }
  }
};

export interface LoadOptionsBase { disabled?: boolean }

export type LoadOptionsWithEnvironment = LoadOptionsBase & { environment: Environment; client?: { configuration?: BrowserOptions; }; };
export type LoadOptionsWithApiKey = LoadOptionsBase & { client: { apiKey: string; configuration?: BrowserOptions; } };
export type LoadOptionsWithClientInstance = LoadOptionsBase & { client: { instance: BrowserClient; } };

export type LoadOptions = LoadOptionsWithEnvironment | LoadOptionsWithApiKey | LoadOptionsWithClientInstance;

export interface SystemBuildProperties {
  /**
   * Name of a building in plaintext, as returned by `BlockIdToKey` in `constants.ts` when passing in an EntityID.
   */
  buildingType: string;
  /**
   * Most systems take a coordinate as a parameter and read the specific building and related metadata during contract execution. Even though such metadata (eg building type and level) aren't passed into the system, we fetch them manually and pass them into Amplitude properties for easier analysis.
   *
   * Stored in the format of \[x, y, z\].
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  coords: [number, number, number];
}

export interface SystemBuildPathProperties {
  /**
   * Most systems take a coordinate as a parameter and read the specific building and related metadata during contract execution. Even though such metadata (eg building type and level) aren't passed into the system, we fetch them manually and pass them into Amplitude properties for easier analysis.
   *
   * Stored in the format of \[x, y, z\].
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  coords: [number, number, number];
  /**
   * Coordinates at which a path ends. The starting coordinates are recorded by the `coords` property.
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  endCoords: [number, number, number];
}

export interface SystemClaimFromMineProperties {
  /**
   * Most systems take a coordinate as a parameter and read the specific building and related metadata during contract execution. Even though such metadata (eg building type and level) aren't passed into the system, we fetch them manually and pass them into Amplitude properties for easier analysis.
   *
   * Stored in the format of \[x, y, z\].
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  coords: [number, number, number];
}

export interface SystemDestroyProperties {
  /**
   * Name of a building in plaintext, as returned by `BlockIdToKey` in `constants.ts` when passing in an EntityID.
   */
  buildingType: string;
  /**
   * Most systems take a coordinate as a parameter and read the specific building and related metadata during contract execution. Even though such metadata (eg building type and level) aren't passed into the system, we fetch them manually and pass them into Amplitude properties for easier analysis.
   *
   * Stored in the format of \[x, y, z\].
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  coords: [number, number, number];
}

export interface SystemDestroyPathProperties {
  /**
   * Most systems take a coordinate as a parameter and read the specific building and related metadata during contract execution. Even though such metadata (eg building type and level) aren't passed into the system, we fetch them manually and pass them into Amplitude properties for easier analysis.
   *
   * Stored in the format of \[x, y, z\].
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  coords: [number, number, number];
}

export interface SystemIncrementProperties {
  /**
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  currIncrementLevel: number;
}

export interface SystemResearchProperties {
  /**
   * Name of a research objective in plaintext, as returned by `BlockIdToKey` in `constants.ts` when passing in an EntityID.
   */
  researchType: string;
}

export interface SystemUpgradeProperties {
  /**
   * Name of a building in plaintext, as returned by `BlockIdToKey` in `constants.ts` when passing in an EntityID.
   */
  buildingType: string;
  /**
   * Most systems take a coordinate as a parameter and read the specific building and related metadata during contract execution. Even though such metadata (eg building type and level) aren't passed into the system, we fetch them manually and pass them into Amplitude properties for easier analysis.
   *
   * Stored in the format of \[x, y, z\].
   *
   * | Rule | Value |
   * |---|---|
   * | Min Items | 3 |
   * | Max Items | 3 |
   * | Item Type | number |
   *
   * @minItems 3
   * @maxItems 3
   */
  coords: [number, number, number];
  /**
   * Current level of the building being upgraded. If there is a duplicate event, then the user failed to upgrade the building in the previous action.
   *
   * | Rule | Value |
   * |---|---|
   * | Type | number |
   */
  currLevel: number;
}

export class NavigateAppLoading implements BaseEvent {
  event_type = 'navigate.AppLoading';
}

export class SystemBuild implements BaseEvent {
  event_type = 'system.Build';

  constructor(
    public event_properties: SystemBuildProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemBuildPath implements BaseEvent {
  event_type = 'system.BuildPath';

  constructor(
    public event_properties: SystemBuildPathProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemClaimFromMine implements BaseEvent {
  event_type = 'system.ClaimFromMine';

  constructor(
    public event_properties: SystemClaimFromMineProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemCraft implements BaseEvent {
  event_type = 'system.Craft';
}

export class SystemDestroy implements BaseEvent {
  event_type = 'system.Destroy';

  constructor(
    public event_properties: SystemDestroyProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemDestroyPath implements BaseEvent {
  event_type = 'system.DestroyPath';

  constructor(
    public event_properties: SystemDestroyPathProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemIncrement implements BaseEvent {
  event_type = 'system.Increment';

  constructor(
    public event_properties: SystemIncrementProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemResearch implements BaseEvent {
  event_type = 'system.Research';

  constructor(
    public event_properties: SystemResearchProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class SystemUpgrade implements BaseEvent {
  event_type = 'system.Upgrade';

  constructor(
    public event_properties: SystemUpgradeProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export type PromiseResult<T> = { promise: Promise<T | void> };

const getVoidPromiseResult = () => ({ promise: Promise.resolve() });

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude?: BrowserClient;

  get client(): BrowserClient {
    this.isInitializedAndEnabled();
    return this.amplitude!;
  }

  get isLoaded(): boolean {
    return this.amplitude != null;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.amplitude) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   *
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options: LoadOptions): PromiseResult<void> {
    this.disabled = options.disabled ?? false;

    if (this.amplitude) {
      console.warn('WARNING: Ampli is already intialized. Ampli.load() should be called once at application startup.');
      return getVoidPromiseResult();
    }

    let apiKey: string | null = null;
    if (options.client && 'apiKey' in options.client) {
      apiKey = options.client.apiKey;
    } else if ('environment' in options) {
      apiKey = ApiKey[options.environment];
    }

    if (options.client && 'instance' in options.client) {
      this.amplitude = options.client.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.createInstance();
      const configuration = (options.client && 'configuration' in options.client) ? options.client.configuration : {};
      return this.amplitude.init(apiKey, undefined, { ...DefaultConfiguration, ...configuration });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }

    return getVoidPromiseResult();
  }

  /**
   * Identify a user and set user properties.
   *
   * @param userId The user's id.
   * @param options Optional event options.
   */
  identify(
    userId: string | undefined,
    options?: EventOptions,
  ): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    if (userId) {
      options = {...options,  user_id: userId};
    }

    const amplitudeIdentify = new amplitude.Identify();
    return this.amplitude!.identify(
      amplitudeIdentify,
      options,
    );
  }

  /**
   * Track event
   *
   * @param event The event to track.
   * @param options Optional event options.
   */
  track(event: Event, options?: EventOptions): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude!.track(event, undefined, options);
  }

  /**
   * navigate.AppLoading
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/navigate.AppLoading)
   *
   * Event has no description in tracking plan.
   *
   * @param options Amplitude event options.
   */
  navigateAppLoading(
    options?: EventOptions,
  ) {
    return this.track(new NavigateAppLoading(), options);
  }

  /**
   * system.Build
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.Build)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. buildingType)
   * @param options Amplitude event options.
   */
  systemBuild(
    properties: SystemBuildProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemBuild(properties), options);
  }

  /**
   * system.BuildPath
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.BuildPath)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. coords)
   * @param options Amplitude event options.
   */
  systemBuildPath(
    properties: SystemBuildPathProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemBuildPath(properties), options);
  }

  /**
   * system.ClaimFromMine
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.ClaimFromMine)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. coords)
   * @param options Amplitude event options.
   */
  systemClaimFromMine(
    properties: SystemClaimFromMineProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemClaimFromMine(properties), options);
  }

  /**
   * system.Craft
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.Craft)
   *
   * Event has no description in tracking plan.
   *
   * @param options Amplitude event options.
   */
  systemCraft(
    options?: EventOptions,
  ) {
    return this.track(new SystemCraft(), options);
  }

  /**
   * system.Destroy
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.Destroy)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. buildingType)
   * @param options Amplitude event options.
   */
  systemDestroy(
    properties: SystemDestroyProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemDestroy(properties), options);
  }

  /**
   * system.DestroyPath
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.DestroyPath)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. coords)
   * @param options Amplitude event options.
   */
  systemDestroyPath(
    properties: SystemDestroyPathProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemDestroyPath(properties), options);
  }

  /**
   * system.Increment
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.Increment)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. currIncrementLevel)
   * @param options Amplitude event options.
   */
  systemIncrement(
    properties: SystemIncrementProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemIncrement(properties), options);
  }

  /**
   * system.Research
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.Research)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. researchType)
   * @param options Amplitude event options.
   */
  systemResearch(
    properties: SystemResearchProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemResearch(properties), options);
  }

  /**
   * system.Upgrade
   *
   * [View in Tracking Plan](https://data.amplitude.com/primodium/primodium-testnet2/events/main/latest/system.Upgrade)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. buildingType)
   * @param options Amplitude event options.
   */
  systemUpgrade(
    properties: SystemUpgradeProperties,
    options?: EventOptions,
  ) {
    return this.track(new SystemUpgrade(properties), options);
  }
}

export const ampli = new Ampli();

// BASE TYPES
type BrowserOptions = amplitude.Types.BrowserOptions;

export type BrowserClient = amplitude.Types.BrowserClient;
export type BaseEvent = amplitude.Types.BaseEvent;
export type IdentifyEvent = amplitude.Types.IdentifyEvent;
export type GroupEvent = amplitude.Types.GroupIdentifyEvent;
export type Event = amplitude.Types.Event;
export type EventOptions = amplitude.Types.EventOptions;
export type Result = amplitude.Types.Result;
