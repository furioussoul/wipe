import { create } from 'zustand'
import type { App, AppSSO } from '@/types/app'
// import type { IChatItem }  '@/app/components/base/chat/chat/type'
declare type IChatItem = any

type State = {
  appDetail?: App & Partial<AppSSO>
  appSidebarExpand: string
  currentLogItem?: IChatItem
  currentLogModalActiveTab: string
  showPromptLogModal: boolean
  showAgentLogModal: boolean
  showMessageLogModal: boolean
}

type Action = {
  setAppDetail: (appDetail?: App & Partial<AppSSO>) => void
  setAppSiderbarExpand: (state: string) => void
  setCurrentLogItem: (item?: IChatItem) => void
  setCurrentLogModalActiveTab: (tab: string) => void
  setShowPromptLogModal: (showPromptLogModal: boolean) => void
  setShowAgentLogModal: (showAgentLogModal: boolean) => void
  setShowMessageLogModal: (showMessageLogModal: boolean) => void
}

export const useStore = create<State & Action>(set => ({
  appDetail: {
    "id": "650c3248-100d-4b68-8f27-bdb149da977b",
    "name": "\u751f\u6d3b\u5c0f\u5e2e\u624b",
    "description": "",
    "mode": "chat",
    "icon": "\ud83e\udd16",
    "icon_background": "#FFEAD5",
    "enable_site": true,
    "enable_api": true,
    "model_config": {
      "opening_statement": "\u60a8\u597d\uff01\u8bf7\u544a\u8bc9\u6211\u60a8\u7684\u95ee\u9898\uff0c\u6211\u4f1a\u8be6\u7ec6\u5730\u4e3a\u60a8\u89e3\u7b54\u3002",
      "suggested_questions": [],
      "suggested_questions_after_answer": {
        "enabled": false
      },
      "speech_to_text": {
        "enabled": false
      },
      "text_to_speech": {
        "enabled": false,
        "voice": "",
        "language": ""
      },
      "retriever_resource": {
        "enabled": true
      },
      "annotation_reply": {
        "id": "093ba4d2-e83c-4012-a799-88e4d67e8d6a",
        "enabled": true,
        "score_threshold": 0.9,
        "embedding_model": {
          "embedding_provider_name": "tongyi",
          "embedding_model_name": "text-embedding-v1"
        }
      },
      "more_like_this": {
        "enabled": false
      },
      "sensitive_word_avoidance": {
        "enabled": false,
        "type": "",
        "configs": []
      },
      "external_data_tools": [],
      "model": {
        "provider": "azure_openai",
        "name": "gpt-4-1106-preview",
        "mode": "chat",
        "completion_params": {
          "stop": []
        }
      },
      "user_input_form": [],
      "dataset_query_variable": "",
      "pre_prompt": "\u5047\u8bbe\u4f60\u662f\u4e2d\u6587\u667a\u8005\uff0c\u7528\u4e2d\u6587\u4e3a\u4ed6\u4eec\u7684\u5de5\u4f5c\u95ee\u9898\u63d0\u4f9b\u89e3\u51b3\u65b9\u6848\u3002\n",
      "agent_mode": {
        "enabled": false,
        "max_iteration": 5,
        "strategy": "function_call",
        "tools": []
      },
      "prompt_type": "simple",
      "chat_prompt_config": {},
      "completion_prompt_config": {},
      "dataset_configs": {
        "retrieval_model": "single",
        "datasets": {
          "datasets": [
            {
              "dataset": {
                "enabled": true,
                "id": "15045111-0b4b-43cd-8b3b-71358a00769e"
              }
            }
          ]
        }
      },
      "file_upload": {
        "image": {
          "enabled": false,
          "number_limits": 3,
          "detail": "high",
          "transfer_methods": [
            "remote_url",
            "local_file"
          ]
        }
      },
      "created_at": 1715591066
    },
    "site": {
      "access_token": "JlgMnCpr2aoUbFUu",
      "code": "JlgMnCpr2aoUbFUu",
      "title": "\u751f\u6d3b\u5c0f\u5e2e\u624b",
      "icon": "\ud83e\udd16",
      "icon_background": "#FFEAD5",
      "description": null,
      "default_language": "zh-Hans",
      "chat_color_theme": null,
      "chat_color_theme_inverted": false,
      "customize_domain": null,
      "copyright": "YidaHu",
      "privacy_policy": null,
      "custom_disclaimer": null,
      "customize_token_strategy": "not_allow",
      "prompt_public": false,
      "app_base_url": "https://tcwlservice.17usoft.com/llmops",
      "show_workflow_steps": true
    },
    "api_base_url": "https://tcwlservice.17usoft.com/llmopsapi/v1",
    "created_at": 1712573469,
    "deleted_tools": []
  },
  setAppDetail: appDetail => set(() => ({ appDetail })),
  appSidebarExpand: '',
  setAppSiderbarExpand: appSidebarExpand => set(() => ({ appSidebarExpand })),
  currentLogItem: undefined,
  currentLogModalActiveTab: 'DETAIL',
  setCurrentLogItem: currentLogItem => set(() => ({ currentLogItem })),
  setCurrentLogModalActiveTab: currentLogModalActiveTab => set(() => ({ currentLogModalActiveTab })),
  showPromptLogModal: false,
  setShowPromptLogModal: showPromptLogModal => set(() => ({ showPromptLogModal })),
  showAgentLogModal: false,
  setShowAgentLogModal: showAgentLogModal => set(() => ({ showAgentLogModal })),
  showMessageLogModal: false,
  setShowMessageLogModal: showMessageLogModal => set(() => {
    if (showMessageLogModal) {
      return { showMessageLogModal }
    }
    else {
      return {
        showMessageLogModal,
        currentLogModalActiveTab: 'DETAIL',
      }
    }
  }),
}))
