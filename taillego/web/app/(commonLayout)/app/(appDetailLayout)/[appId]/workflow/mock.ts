const graph_mock = {
  "id": "0896e66f-758d-4c42-b6b7-c308b66cf771",
  "graph": {
      "nodes": [
          {
              "id": "1724918746285",
              "type": "custom",
              "data": {
                  "type": "start",
                  "title": "\u5f00\u59cb",
                  "desc": "",
                  "variables": [],
                  "selected": false
              },
              "position": {
                  "x": 80,
                  "y": 282
              },
              "targetPosition": "left",
              "sourcePosition": "right",
              "positionAbsolute": {
                  "x": 80,
                  "y": 282
              },
              "width": 244,
              "height": 54
          },
          {
              "id": "1724918751353",
              "type": "custom",
              "data": {
                  "type": "code",
                  "title": "\u4ee3\u7801\u6267\u884c",
                  "desc": "",
                  "variables": [],
                  "code_language": "python3",
                  "code": "\ndef main() -> dict:\n    return {\n        \"result\": \"\"\n    }\n",
                  "outputs": {
                      "result": {
                          "type": "string",
                          "children": null
                      }
                  },
                  "selected": false
              },
              "position": {
                  "x": 384,
                  "y": 282
              },
              "targetPosition": "left",
              "sourcePosition": "right",
              "positionAbsolute": {
                  "x": 384,
                  "y": 282
              },
              "width": 244,
              "height": 54,
              "selected": true
          },
          {
              "id": "1724918768968",
              "type": "custom",
              "data": {
                  "type": "end",
                  "title": "\u7ed3\u675f",
                  "desc": "",
                  "outputs": [
                      {
                          "variable": "result",
                          "value_selector": [
                              "1724918751353",
                              "result"
                          ]
                      }
                  ],
                  "selected": false
              },
              "position": {
                  "x": 688,
                  "y": 282
              },
              "targetPosition": "left",
              "sourcePosition": "right",
              "positionAbsolute": {
                  "x": 688,
                  "y": 282
              },
              "width": 244,
              "height": 90
          }
      ],
      "edges": [
          {
              "id": "1724918746285-source-1724918751353-target",
              "type": "custom",
              "source": "1724918746285",
              "sourceHandle": "source",
              "target": "1724918751353",
              "targetHandle": "target",
              "data": {
                  "sourceType": "start",
                  "targetType": "code",
                  "isInIteration": false
              },
              "zIndex": 0
          },
          {
              "id": "1724918751353-source-1724918768968-target",
              "type": "custom",
              "source": "1724918751353",
              "sourceHandle": "source",
              "target": "1724918768968",
              "targetHandle": "target",
              "data": {
                  "sourceType": "code",
                  "targetType": "end",
                  "isInIteration": false
              },
              "zIndex": 0
          }
      ],
      "viewport": {
          "x": 1,
          "y": 0,
          "zoom": 1
      }
  },
  "features": {
      "opening_statement": "",
      "suggested_questions": [],
      "suggested_questions_after_answer": {
          "enabled": false
      },
      "text_to_speech": {
          "enabled": false,
          "voice": "",
          "language": ""
      },
      "speech_to_text": {
          "enabled": false
      },
      "retriever_resource": {
          "enabled": true
      },
      "sensitive_word_avoidance": {
          "enabled": false
      },
      "file_upload": {
          "image": {
              "enabled": false,
              "number_limits": 3,
              "transfer_methods": [
                  "local_file",
                  "remote_url"
              ]
          }
      }
  },
  "hash": "b80a7e95faf80ec61787a8f5288cd3d95e3ee01e59dfc92e936660d6a0c179d3",
  "created_by": {
      "id": "056da00a-6193-4b1c-90ac-1081bffc1d90",
      "name": "syc",
      "email": "yuchun.shao@ly.com"
  },
  "created_at": 1724918747,
  "updated_by": {
      "id": "db503068-c953-400f-96aa-239762642f1a",
      "name": "geralt.sun",
      "email": "geralt.sun@ly.com"
  },
  "updated_at": 1727519247,
  "tool_published": true,
  "environment_variables": []
}

export default graph_mock