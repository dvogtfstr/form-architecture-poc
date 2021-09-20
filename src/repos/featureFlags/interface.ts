export enum FEATURE_FLAGS {
  ADDRESS = 'address',
  ADDITIONAL_INFO = 'additional_info',
  EXTRAS = 'extras',
}

export type FeatureFlagsKeys = keyof typeof FEATURE_FLAGS;

export interface IFeatureFlagsRepo {
  getFlagByName(name: FeatureFlagsKeys): boolean;
  getAllFlags(): Record<FEATURE_FLAGS, boolean>;
}
