import { Service } from 'typedi';

import {
  FEATURE_FLAGS,
  IFeatureFlagsRepo,
  FeatureFlagsKeys,
} from './interface';

@Service()
export class FeatureFlagsRepo implements IFeatureFlagsRepo {
  flags: Record<FEATURE_FLAGS, boolean>;

  constructor() {
    const fetchedFlags = this.getFlagsConfig();
    this.flags = fetchedFlags;
  }

  private getFlagsConfig() {
    // Some logic to fetch config
    return {
      [FEATURE_FLAGS.ADDRESS]: true,
      [FEATURE_FLAGS.ADDITIONAL_INFO]: true,
      [FEATURE_FLAGS.EXTRAS]: true,
    };
  }

  public getAllFlags() {
    return this.flags;
  }

  public getFlagByName(name: FeatureFlagsKeys): boolean {
    return this.flags[FEATURE_FLAGS[name]];
  }
}
