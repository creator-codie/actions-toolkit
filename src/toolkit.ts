/**
 * Copyright 2023 actions-toolkit authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Context} from './context';
import {Buildx} from './buildx/buildx';
import {Install} from './buildx/install';
import {Builder} from './buildx/builder';
import {BuildKit} from './buildkit/buildkit';
import {GitHub} from './github';

export interface ToolkitOpts {
  /**
   * GitHub token to use for authentication.
   * Uses `process.env.GITHUB_TOKEN` by default.
   */
  githubToken?: string;
}

export class Toolkit {
  public context: Context;
  public github: GitHub;
  public buildx: Buildx;
  public buildxInstall: Install;
  public builder: Builder;
  public buildkit: BuildKit;

  constructor(opts: ToolkitOpts = {}) {
    this.context = new Context();
    this.github = new GitHub({token: opts.githubToken});
    this.buildx = new Buildx({context: this.context});
    this.buildxInstall = new Install({context: this.context});
    this.builder = new Builder({context: this.context, buildx: this.buildx});
    this.buildkit = new BuildKit({context: this.context, buildx: this.buildx});
  }
}
