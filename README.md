# opencode-env-auth

An [OpenCode](https://opencode.ai/) plugin that lets `/connect` authenticate providers
using API keys you already have in your environment variables, instead of prompting you
to paste a key by hand.

If you keep provider keys like `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or
`DEEPSEEK_API_KEY` in your shell, this plugin adds a "Use `<VAR>`" auth option to
`/connect` for each provider so connecting is a single keystroke.

> Repository: https://github.com/f-steff/opencode-env-auth

## Features

- Adds an environment-variable auth method to `/connect` for 150+ providers in
  OpenCode's provider catalog.
- Checks a provider's known key variables in order and uses the first one that is set.
- Supports providers that need multiple variables (e.g. Azure, Amazon Bedrock,
  Cloudflare, Google Vertex).
- No secrets are stored in this repository. Keys stay in your environment and are only
  read at connect time.

## Requirements

- [OpenCode](https://opencode.ai/) installed.
- One or more provider API keys exported as environment variables.

## Installation

This plugin is distributed via GitHub. OpenCode automatically loads any `.js` file placed
directly in its global plugins folder:

| OS            | Plugins folder                                                        |
| ------------- | --------------------------------------------------------------------- |
| Windows       | `%USERPROFILE%\.config\opencode\plugins\` (PowerShell: `$env:USERPROFILE\.config\opencode\plugins\`) |
| macOS / Linux | `~/.config/opencode/plugins/`                                         |

So installing is just: put `opencode-env-auth.js` and `opencode-env-auth-provider-envs.json` into that folder. Pick
whichever option below you prefer.

> Note: OpenCode only scans files placed **directly** in the `plugins` folder, not in
> subfolders. Keep the two files at the top level of that folder.

### Option A — Copy the files (simplest, no config edit)

Download or clone this repository, then copy `opencode-env-auth.js` and `opencode-env-auth-provider-envs.json` into the
plugins folder. That's it — restart OpenCode and the plugin is active.

**Windows (PowerShell)**

```powershell
$dest = "$env:USERPROFILE\.config\opencode\plugins"
New-Item -ItemType Directory -Force $dest | Out-Null
Copy-Item .\opencode-env-auth.js, .\opencode-env-auth-provider-envs.json $dest
```

**macOS / Linux**

```bash
mkdir -p ~/.config/opencode/plugins
cp opencode-env-auth.js opencode-env-auth-provider-envs.json ~/.config/opencode/plugins/
```

To update later, copy the two files again after pulling the latest version.

### Option B — Clone and reference it (best for `git pull` updates)

Clone the repository wherever you like, then point your config at its `opencode-env-auth.js`. Updating
is then just `git pull` in the clone.

```bash
git clone https://github.com/f-steff/opencode-env-auth
```

Add the path to the `plugin` array in your global config (`opencode.json`):

**Windows**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["file:///C:/path/to/opencode-env-auth/opencode-env-auth.js"]
}
```

**macOS / Linux**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["file:///path/to/opencode-env-auth/opencode-env-auth.js"]
}
```

Update later with:

```bash
git -C /path/to/opencode-env-auth pull
```

> Not published to npm yet. If there's demand for `"plugin": ["opencode-env-auth"]`
> style installs, npm publishing may be added later.

## Usage

Export the relevant API-key environment variable(s) before starting OpenCode:

**Windows (PowerShell)**

```powershell
$env:ANTHROPIC_API_KEY = "..."
$env:OPENAI_API_KEY = "..."
$env:DEEPSEEK_API_KEY = "..."
opencode
```

**macOS / Linux**

```bash
export ANTHROPIC_API_KEY="..."
export OPENAI_API_KEY="..."
export DEEPSEEK_API_KEY="..."
opencode
```

Then in OpenCode:

```text
/connect
```

Pick the provider. You'll see an environment-based option such as
`Use ANTHROPIC_API_KEY`. Selecting it stores the key in OpenCode's global auth store.

## Repository Layout

```
opencode-env-auth.js                  The plugin: exports one auth hook per provider
opencode-env-auth-provider-envs.json  Provider -> API-key env var mapping (edit this to add providers)
README.md                             This file
LICENSE                               MIT license
```

## How It Works

OpenCode exposes an `auth` plugin hook per provider. This plugin exports one generated
auth hook for every provider listed in [`opencode-env-auth-provider-envs.json`](./opencode-env-auth-provider-envs.json).

Each hook presents an automatic auth method. When selected, it:

1. Checks the provider's configured environment variables in order.
2. Uses the first variable that is currently set.
3. Saves the value as an OpenCode API-key credential for that provider.

## Supported Providers

The full list of providers and the environment variables they use lives in
[`opencode-env-auth-provider-envs.json`](./opencode-env-auth-provider-envs.json). Well-tested examples:

- **OpenAI** — `CODEX_API_KEY`, then `OPENAI_API_KEY`
- **Anthropic** — `ANTHROPIC_API_KEY`
- **DeepSeek** — `DEEPSEEK_API_KEY`

For OpenAI the plugin checks `CODEX_API_KEY` first, then falls back to `OPENAI_API_KEY`.

## Customizing Providers

Most changes only require editing `opencode-env-auth-provider-envs.json`; each generated hook reads its
`env` entry at runtime.

### Add another variable for an existing provider

Change the provider's `env` to an array (checked in order):

```json
{
  "openai": {
    "name": "OpenAI",
    "env": ["CODEX_API_KEY", "OPENAI_API_KEY", "MY_OPENAI_API_KEY"]
  }
}
```

### Add a new provider

Add it to `opencode-env-auth-provider-envs.json`:

```json
{
  "my-provider": {
    "name": "My Provider",
    "env": "MY_PROVIDER_API_KEY"
  }
}
```

Then add a matching export in `opencode-env-auth.js`:

```js
export const EnvAuth_my_provider = envAuthPlugin("my-provider", providerEnvs["my-provider"])
```

Restart OpenCode after editing either file.

### Regenerating the provider list

`opencode-env-auth-provider-envs.json` was generated from OpenCode's upstream models fixture
(`packages/opencode/test/tool/fixtures/models-api.json`). Regenerate it when OpenCode
adds, removes, or renames providers.

## Limitations

OpenCode's `/connect` "Popular" section is hard-coded in the TUI and is not exposed
through the plugin API. This plugin changes how providers authenticate, not the ordering
of the Popular list.

## License

Released under the MIT License. Copyright (c) 2026 Flemming Steffensen (fsteff).
See [`LICENSE`](./LICENSE).

---

opencode-env-auth is not built by, or affiliated with, the OpenCode team.
