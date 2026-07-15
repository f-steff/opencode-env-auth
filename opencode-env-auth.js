// opencode-env-auth
//
// An OpenCode plugin that adds an environment-variable auth method to `/connect`
// for each supported provider.
//
// Repository: https://github.com/f-steff/opencode-env-auth
//
// Copyright (c) 2026 Flemming Steffensen (fsteff)
// Released under the MIT License. See the LICENSE file for details.
//
// How the file is organized:
//   1. `opencode-env-auth-provider-envs.json` maps each provider id to its API-key env var(s).
//      That is the file you normally edit to add or change providers.
//   2. `envAuthPlugin()` below builds one OpenCode auth hook from a provider entry.
//   3. The `export const EnvAuth_<provider> = ...` block at the bottom exports one
//      hook per provider.
//
// Why one export per provider (instead of a loop)?
//   OpenCode discovers plugins by inspecting a module's *named exports*, and each
//   auth hook returns exactly one provider's `{ provider, methods }`. ES modules
//   cannot create named exports dynamically, so the export list is mechanical:
//   there is one line per entry in `opencode-env-auth-provider-envs.json`. When you add a provider
//   to that JSON file, add a matching `export const` line here.

import providerEnvs from "./opencode-env-auth-provider-envs.json" with { type: "json" }

function envAuthPlugin(providerID, provider) {
  const rawEnvVars = provider.env
  const envVars = (Array.isArray(rawEnvVars) ? rawEnvVars : [rawEnvVars]).filter(Boolean)

  return async function OpenCodeEnvAuthPlugin() {
    return {
      auth: {
        provider: providerID,
        methods: [
          {
            type: "oauth",
            label: envVars.length === 1 ? `Use ${envVars[0]}` : "Use environment API key",
            authorize: async () => {
              const match = envVars.find((envVar) => process.env[envVar])

              return {
                url: match ? `env:${match}` : `env:${envVars.join("|")}`,
                method: "auto",
                instructions: match
                  ? `Using ${match} from the environment.`
                  : `Set one of these environment variables: ${envVars.join(", ")}`,
                callback: async () => {
                  if (!match) return { type: "failed" }
                  return { type: "success", key: process.env[match] }
                },
              }
            },
          },
        ],
      },
    }
  }
}

export const EnvAuth_requesty = envAuthPlugin("requesty", providerEnvs["requesty"])
export const EnvAuth_qiniu_ai = envAuthPlugin("qiniu-ai", providerEnvs["qiniu-ai"])
export const EnvAuth_alibaba_cn = envAuthPlugin("alibaba-cn", providerEnvs["alibaba-cn"])
export const EnvAuth_regolo_ai = envAuthPlugin("regolo-ai", providerEnvs["regolo-ai"])
export const EnvAuth_stackit = envAuthPlugin("stackit", providerEnvs["stackit"])
export const EnvAuth_vercel = envAuthPlugin("vercel", providerEnvs["vercel"])
export const EnvAuth_submodel = envAuthPlugin("submodel", providerEnvs["submodel"])
export const EnvAuth_huggingface = envAuthPlugin("huggingface", providerEnvs["huggingface"])
export const EnvAuth_minimax_coding_plan = envAuthPlugin("minimax-coding-plan", providerEnvs["minimax-coding-plan"])
export const EnvAuth_novita_ai = envAuthPlugin("novita-ai", providerEnvs["novita-ai"])
export const EnvAuth_xai = envAuthPlugin("xai", providerEnvs["xai"])
export const EnvAuth_privatemode_ai = envAuthPlugin("privatemode-ai", providerEnvs["privatemode-ai"])
export const EnvAuth_drun = envAuthPlugin("drun", providerEnvs["drun"])
export const EnvAuth_alibaba_token_plan_cn = envAuthPlugin("alibaba-token-plan-cn", providerEnvs["alibaba-token-plan-cn"])
export const EnvAuth_moonshotai = envAuthPlugin("moonshotai", providerEnvs["moonshotai"])
export const EnvAuth_fireworks_ai = envAuthPlugin("fireworks-ai", providerEnvs["fireworks-ai"])
export const EnvAuth_vultr = envAuthPlugin("vultr", providerEnvs["vultr"])
export const EnvAuth_302ai = envAuthPlugin("302ai", providerEnvs["302ai"])
export const EnvAuth_trustedrouter = envAuthPlugin("trustedrouter", providerEnvs["trustedrouter"])
export const EnvAuth_zhipuai = envAuthPlugin("zhipuai", providerEnvs["zhipuai"])
export const EnvAuth_cortecs = envAuthPlugin("cortecs", providerEnvs["cortecs"])
export const EnvAuth_nebius = envAuthPlugin("nebius", providerEnvs["nebius"])
export const EnvAuth_auriko = envAuthPlugin("auriko", providerEnvs["auriko"])
export const EnvAuth_stepfun_ai = envAuthPlugin("stepfun-ai", providerEnvs["stepfun-ai"])
export const EnvAuth_vivgrid = envAuthPlugin("vivgrid", providerEnvs["vivgrid"])
export const EnvAuth_tinfoil = envAuthPlugin("tinfoil", providerEnvs["tinfoil"])
export const EnvAuth_mistral = envAuthPlugin("mistral", providerEnvs["mistral"])
export const EnvAuth_cloudflare_workers_ai = envAuthPlugin("cloudflare-workers-ai", providerEnvs["cloudflare-workers-ai"])
export const EnvAuth_bailing = envAuthPlugin("bailing", providerEnvs["bailing"])
export const EnvAuth_anyapi = envAuthPlugin("anyapi", providerEnvs["anyapi"])
export const EnvAuth_google = envAuthPlugin("google", providerEnvs["google"])
export const EnvAuth_opencode_go = envAuthPlugin("opencode-go", providerEnvs["opencode-go"])
export const EnvAuth_digitalocean = envAuthPlugin("digitalocean", providerEnvs["digitalocean"])
export const EnvAuth_subconscious = envAuthPlugin("subconscious", providerEnvs["subconscious"])
export const EnvAuth_venice = envAuthPlugin("venice", providerEnvs["venice"])
export const EnvAuth_crossmodel = envAuthPlugin("crossmodel", providerEnvs["crossmodel"])
export const EnvAuth_lmstudio = envAuthPlugin("lmstudio", providerEnvs["lmstudio"])
export const EnvAuth_poolside = envAuthPlugin("poolside", providerEnvs["poolside"])
export const EnvAuth_zenifra = envAuthPlugin("zenifra", providerEnvs["zenifra"])
export const EnvAuth_zenmux = envAuthPlugin("zenmux", providerEnvs["zenmux"])
export const EnvAuth_kenari = envAuthPlugin("kenari", providerEnvs["kenari"])
export const EnvAuth_model_oracle_ai = envAuthPlugin("model-oracle-ai", providerEnvs["model-oracle-ai"])
export const EnvAuth_openai = envAuthPlugin("openai", providerEnvs["openai"])
export const EnvAuth_berget = envAuthPlugin("berget", providerEnvs["berget"])
export const EnvAuth_snowflake_cortex = envAuthPlugin("snowflake-cortex", providerEnvs["snowflake-cortex"])
export const EnvAuth_tencent_token_plan = envAuthPlugin("tencent-token-plan", providerEnvs["tencent-token-plan"])
export const EnvAuth_github_models = envAuthPlugin("github-models", providerEnvs["github-models"])
export const EnvAuth_neuralwatt = envAuthPlugin("neuralwatt", providerEnvs["neuralwatt"])
export const EnvAuth_siliconflow_cn = envAuthPlugin("siliconflow-cn", providerEnvs["siliconflow-cn"])
export const EnvAuth_merge_gateway = envAuthPlugin("merge-gateway", providerEnvs["merge-gateway"])
export const EnvAuth_qihang_ai = envAuthPlugin("qihang-ai", providerEnvs["qihang-ai"])
export const EnvAuth_xiaomi_token_plan_ams = envAuthPlugin("xiaomi-token-plan-ams", providerEnvs["xiaomi-token-plan-ams"])
export const EnvAuth_modelscope = envAuthPlugin("modelscope", providerEnvs["modelscope"])
export const EnvAuth_groq = envAuthPlugin("groq", providerEnvs["groq"])
export const EnvAuth_mixlayer = envAuthPlugin("mixlayer", providerEnvs["mixlayer"])
export const EnvAuth_orcarouter = envAuthPlugin("orcarouter", providerEnvs["orcarouter"])
export const EnvAuth_helicone = envAuthPlugin("helicone", providerEnvs["helicone"])
export const EnvAuth_zai = envAuthPlugin("zai", providerEnvs["zai"])
export const EnvAuth_nearai = envAuthPlugin("nearai", providerEnvs["nearai"])
export const EnvAuth_pioneer = envAuthPlugin("pioneer", providerEnvs["pioneer"])
export const EnvAuth_llmgateway = envAuthPlugin("llmgateway", providerEnvs["llmgateway"])
export const EnvAuth_alibaba_coding_plan_cn = envAuthPlugin("alibaba-coding-plan-cn", providerEnvs["alibaba-coding-plan-cn"])
export const EnvAuth_abacus = envAuthPlugin("abacus", providerEnvs["abacus"])
export const EnvAuth_cloudferro_sherlock = envAuthPlugin("cloudferro-sherlock", providerEnvs["cloudferro-sherlock"])
export const EnvAuth_ollama_cloud = envAuthPlugin("ollama-cloud", providerEnvs["ollama-cloud"])
export const EnvAuth_cloudflare_ai_gateway = envAuthPlugin("cloudflare-ai-gateway", providerEnvs["cloudflare-ai-gateway"])
export const EnvAuth_moonshotai_cn = envAuthPlugin("moonshotai-cn", providerEnvs["moonshotai-cn"])
export const EnvAuth_morph = envAuthPlugin("morph", providerEnvs["morph"])
export const EnvAuth_sakana = envAuthPlugin("sakana", providerEnvs["sakana"])
export const EnvAuth_deepinfra = envAuthPlugin("deepinfra", providerEnvs["deepinfra"])
export const EnvAuth_google_vertex_anthropic = envAuthPlugin("google-vertex-anthropic", providerEnvs["google-vertex-anthropic"])
export const EnvAuth_v0 = envAuthPlugin("v0", providerEnvs["v0"])
export const EnvAuth_azure = envAuthPlugin("azure", providerEnvs["azure"])
export const EnvAuth_cerebras = envAuthPlugin("cerebras", providerEnvs["cerebras"])
export const EnvAuth_zai_coding_plan = envAuthPlugin("zai-coding-plan", providerEnvs["zai-coding-plan"])
export const EnvAuth_nvidia = envAuthPlugin("nvidia", providerEnvs["nvidia"])
export const EnvAuth_evroc = envAuthPlugin("evroc", providerEnvs["evroc"])
export const EnvAuth_xiaomi = envAuthPlugin("xiaomi", providerEnvs["xiaomi"])
export const EnvAuth_inception = envAuthPlugin("inception", providerEnvs["inception"])
export const EnvAuth_anthropic = envAuthPlugin("anthropic", providerEnvs["anthropic"])
export const EnvAuth_tencent_coding_plan = envAuthPlugin("tencent-coding-plan", providerEnvs["tencent-coding-plan"])
export const EnvAuth_freemodel = envAuthPlugin("freemodel", providerEnvs["freemodel"])
export const EnvAuth_sap_ai_core = envAuthPlugin("sap-ai-core", providerEnvs["sap-ai-core"])
export const EnvAuth_opencode = envAuthPlugin("opencode", providerEnvs["opencode"])
export const EnvAuth_inference = envAuthPlugin("inference", providerEnvs["inference"])
export const EnvAuth_inceptron = envAuthPlugin("inceptron", providerEnvs["inceptron"])
export const EnvAuth_llama = envAuthPlugin("llama", providerEnvs["llama"])
export const EnvAuth_llmtr = envAuthPlugin("llmtr", providerEnvs["llmtr"])
export const EnvAuth_cohere = envAuthPlugin("cohere", providerEnvs["cohere"])
export const EnvAuth_sarvam = envAuthPlugin("sarvam", providerEnvs["sarvam"])
export const EnvAuth_stepfun = envAuthPlugin("stepfun", providerEnvs["stepfun"])
export const EnvAuth_hpc_ai = envAuthPlugin("hpc-ai", providerEnvs["hpc-ai"])
export const EnvAuth_minimax_cn = envAuthPlugin("minimax-cn", providerEnvs["minimax-cn"])
export const EnvAuth_unorouter = envAuthPlugin("unorouter", providerEnvs["unorouter"])
export const EnvAuth_alibaba_coding_plan = envAuthPlugin("alibaba-coding-plan", providerEnvs["alibaba-coding-plan"])
export const EnvAuth_longcat = envAuthPlugin("longcat", providerEnvs["longcat"])
export const EnvAuth_poe = envAuthPlugin("poe", providerEnvs["poe"])
export const EnvAuth_kimi_for_coding = envAuthPlugin("kimi-for-coding", providerEnvs["kimi-for-coding"])
export const EnvAuth_dinference = envAuthPlugin("dinference", providerEnvs["dinference"])
export const EnvAuth_perplexity_agent = envAuthPlugin("perplexity-agent", providerEnvs["perplexity-agent"])
export const EnvAuth_siliconflow = envAuthPlugin("siliconflow", providerEnvs["siliconflow"])
export const EnvAuth_umans_ai_coding_plan = envAuthPlugin("umans-ai-coding-plan", providerEnvs["umans-ai-coding-plan"])
export const EnvAuth_io_net = envAuthPlugin("io-net", providerEnvs["io-net"])
export const EnvAuth_gmicloud = envAuthPlugin("gmicloud", providerEnvs["gmicloud"])
export const EnvAuth_xiaomi_token_plan_cn = envAuthPlugin("xiaomi-token-plan-cn", providerEnvs["xiaomi-token-plan-cn"])
export const EnvAuth_zeldoc = envAuthPlugin("zeldoc", providerEnvs["zeldoc"])
export const EnvAuth_scaleway = envAuthPlugin("scaleway", providerEnvs["scaleway"])
export const EnvAuth_empiriolabs = envAuthPlugin("empiriolabs", providerEnvs["empiriolabs"])
export const EnvAuth_ovhcloud = envAuthPlugin("ovhcloud", providerEnvs["ovhcloud"])
export const EnvAuth_friendli = envAuthPlugin("friendli", providerEnvs["friendli"])
export const EnvAuth_tencent_tokenhub = envAuthPlugin("tencent-tokenhub", providerEnvs["tencent-tokenhub"])
export const EnvAuth_wandb = envAuthPlugin("wandb", providerEnvs["wandb"])
export const EnvAuth_kuae_cloud_coding_plan = envAuthPlugin("kuae-cloud-coding-plan", providerEnvs["kuae-cloud-coding-plan"])
export const EnvAuth_gitlab = envAuthPlugin("gitlab", providerEnvs["gitlab"])
export const EnvAuth_kilo = envAuthPlugin("kilo", providerEnvs["kilo"])
export const EnvAuth_lucidquery = envAuthPlugin("lucidquery", providerEnvs["lucidquery"])
export const EnvAuth_meganova = envAuthPlugin("meganova", providerEnvs["meganova"])
export const EnvAuth_inferx = envAuthPlugin("inferx", providerEnvs["inferx"])
export const EnvAuth_perplexity = envAuthPlugin("perplexity", providerEnvs["perplexity"])
export const EnvAuth_amazon_bedrock = envAuthPlugin("amazon-bedrock", providerEnvs["amazon-bedrock"])
export const EnvAuth_umans_ai = envAuthPlugin("umans-ai", providerEnvs["umans-ai"])
export const EnvAuth_togetherai = envAuthPlugin("togetherai", providerEnvs["togetherai"])
export const EnvAuth_frogbot = envAuthPlugin("frogbot", providerEnvs["frogbot"])
export const EnvAuth_openrouter = envAuthPlugin("openrouter", providerEnvs["openrouter"])
export const EnvAuth_jiekou = envAuthPlugin("jiekou", providerEnvs["jiekou"])
export const EnvAuth_nova = envAuthPlugin("nova", providerEnvs["nova"])
export const EnvAuth_alibaba_token_plan = envAuthPlugin("alibaba-token-plan", providerEnvs["alibaba-token-plan"])
export const EnvAuth_alibaba = envAuthPlugin("alibaba", providerEnvs["alibaba"])
export const EnvAuth_databricks = envAuthPlugin("databricks", providerEnvs["databricks"])
export const EnvAuth_crof = envAuthPlugin("crof", providerEnvs["crof"])
export const EnvAuth_fastrouter = envAuthPlugin("fastrouter", providerEnvs["fastrouter"])
export const EnvAuth_abliteration_ai = envAuthPlugin("abliteration-ai", providerEnvs["abliteration-ai"])
export const EnvAuth_xpersona = envAuthPlugin("xpersona", providerEnvs["xpersona"])
export const EnvAuth_azure_cognitive_services = envAuthPlugin("azure-cognitive-services", providerEnvs["azure-cognitive-services"])
export const EnvAuth_baseten = envAuthPlugin("baseten", providerEnvs["baseten"])
export const EnvAuth_atomic_chat = envAuthPlugin("atomic-chat", providerEnvs["atomic-chat"])
export const EnvAuth_meta = envAuthPlugin("meta", providerEnvs["meta"])
export const EnvAuth_routing_run = envAuthPlugin("routing-run", providerEnvs["routing-run"])
export const EnvAuth_aihubmix = envAuthPlugin("aihubmix", providerEnvs["aihubmix"])
export const EnvAuth_google_vertex = envAuthPlugin("google-vertex", providerEnvs["google-vertex"])
export const EnvAuth_nano_gpt = envAuthPlugin("nano-gpt", providerEnvs["nano-gpt"])
export const EnvAuth_moark = envAuthPlugin("moark", providerEnvs["moark"])
export const EnvAuth_lilac = envAuthPlugin("lilac", providerEnvs["lilac"])
export const EnvAuth_ambient = envAuthPlugin("ambient", providerEnvs["ambient"])
export const EnvAuth_neon = envAuthPlugin("neon", providerEnvs["neon"])
export const EnvAuth_upstage = envAuthPlugin("upstage", providerEnvs["upstage"])
export const EnvAuth_zhipuai_coding_plan = envAuthPlugin("zhipuai-coding-plan", providerEnvs["zhipuai-coding-plan"])
export const EnvAuth_chutes = envAuthPlugin("chutes", providerEnvs["chutes"])
export const EnvAuth_minimax_cn_coding_plan = envAuthPlugin("minimax-cn-coding-plan", providerEnvs["minimax-cn-coding-plan"])
export const EnvAuth_deepseek = envAuthPlugin("deepseek", providerEnvs["deepseek"])
export const EnvAuth_wafer_ai = envAuthPlugin("wafer.ai", providerEnvs["wafer.ai"])
export const EnvAuth_minimax = envAuthPlugin("minimax", providerEnvs["minimax"])
export const EnvAuth_github_copilot = envAuthPlugin("github-copilot", providerEnvs["github-copilot"])
export const EnvAuth_clarifai = envAuthPlugin("clarifai", providerEnvs["clarifai"])
export const EnvAuth_the_grid_ai = envAuthPlugin("the-grid-ai", providerEnvs["the-grid-ai"])
export const EnvAuth_synthetic = envAuthPlugin("synthetic", providerEnvs["synthetic"])
export const EnvAuth_iflowcn = envAuthPlugin("iflowcn", providerEnvs["iflowcn"])
export const EnvAuth_xiaomi_token_plan_sgp = envAuthPlugin("xiaomi-token-plan-sgp", providerEnvs["xiaomi-token-plan-sgp"])
export const EnvAuth_claudinio = envAuthPlugin("claudinio", providerEnvs["claudinio"])

