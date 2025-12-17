export const templates = {
  Cliente: [
    // Cliente PJ (Indústria/Comércio)
    {
      "ADRMAS03": {
        "E1ADRMAS": {
          "OBJ_TYPE": "KNA1",
          "CONTEXT": "0001",
          "E1BPAD1VL": [{
            "NAME": "INDÚSTRIA MODELO LTDA",
            "STREET": "AVENIDA INDUSTRIAL",
            "HOUSE_NO": "1000",
            "POSTL_COD1": "04578-000",
            "CITY": "SAO PAULO",
            "REGION": "SP",
            "COUNTRY": "BR",
            "LANGU": "P",
            "LANGU_ISO": "PT"
          }],
          "E1BPADSMTP": [{           
            "E_MAIL": "nfe@industriamodelo.com.br"
          }]
        }
      },
      "DEBMAS06": {
        "E1KNA1M": { // --- DADOS GERAIS ---
          "KTOKD": "Z001",           
          "LAND1": "BR",
          "NAME1": "INDÚSTRIA MODELO LTDA",
          "STCD1": "12345678000190", // CNPJ
          "STCD3": "123456789",      // IE
          "STCD4": "98765432",       // IM
          
          // --- DADOS DA EMPRESA (FINANCEIRO) ---
          // Segmento repetível para cada Empresa (BUKRS)
          "E1KNB1M": [
            {
              "BUKRS": "1000",       // Empresa
              "AKONT": "11210001",   // Conta Reconciliação (Obrigatório)
              "ZTERM": "Z040",       // Condição Pagto (Finan)
              "ZWELS": "E"           // Forma Pagto (Ex: Boleto)
            }
          ],

          // --- DADOS DE VENDAS (COMERCIAL) ---
          // Segmento repetível para cada Área de Vendas
          "E1KNVVM": [
            {
              "VKORG": "2000",       // Org Vendas
              "VTWEG": "20",         // Canal
              "SPART": "30",         // Setor
              "WAERS": "BRL",
              "ZTERM": "Z040",       // Condição Pagto (Vendas)
              "VSBED": "01",         // Condição Expedição
              
              "E1KNVPM": [           // Parceiros
                { "PARVW": "AG", "KUNN2": "10000661", "PARZA": "000" }, 
                { "PARVW": "WE", "KUNN2": "10000661", "PARZA": "000" }
              ],
              
              "E1KNVIM": [           // Impostos (Tax Indicator)
                { "ALAND": "BR", "TATYP": "IBRX", "TAXKD": "1" }, 
                { "ALAND": "BR", "TATYP": "IPI1", "TAXKD": "1" }
              ]
            }
          ]
        }
      }
    },
    // Cliente PF (Consumidor Final)
    {
      "ADRMAS03": {
        "E1ADRMAS": {
            "E1BPAD1VL": [{
                "NAME": "SIDNEY CORREIA",
                "CITY": "SAO PAULO",
                "POSTL_COD1": "01005-000",
                "STREET": "RUA BENJAMIM CONSTANT",
                "HOUSE_NO": "10",
                "COUNTRY": "BR",
                "REGION": "SP"
            }]
        }
      },
      "DEBMAS06": {
        "E1KNA1M": {
          "KTOKD": "Z010",           // Consumidor Final
          "NAME1": "SIDNEY CORREIA",
          "STCD2": "12345678900",    // CPF (Campo STCD2)
          "STKZN": "X",              // FLAG OBRIGATÓRIO (Pessoa Física)
          "LAND1": "BR",
          
          "E1KNB1M": [
            {
               "BUKRS": "1000",
               "AKONT": "11210002",  // Conta Diferente para PF
               "ZTERM": "Z001"       // À Vista
            }
          ],
          
          "E1KNVVM": [
            {
              "VKORG": "2000",
              "VTWEG": "10",         // Canal Varejo
              "SPART": "30",
              "WAERS": "BRL",
              "E1KNVIM": [
                { "ALAND": "BR", "TATYP": "IBRX", "TAXKD": "0" } // Isento
              ]
            }
          ]
        }
      }
    },
    // Cliente Estrangeiro (Exportação)
    {
      "ADRMAS03": {
        "E1ADRMAS": {
          "E1BPAD1VL": [{
            "NAME": "TIMBERLAND US INC",
            "STREET": "BROADWAY",
            "HOUSE_NO": "500",
            "CITY": "NEW YORK",
            "REGION": "NY",          
            "COUNTRY": "US",         // País ISO
            "LANGU_ISO": "EN"
          }]
        }
      },
      "DEBMAS06": {
        "E1KNA1M": {
          "KTOKD": "Z002",           // Mercado Externo
          "LAND1": "US",
          "NAME1": "TIMBERLAND US INC",
          // STCD1 e STCD2 ficam vazios
          
          "E1KNB1M": [
            {
              "BUKRS": "1000",
              "AKONT": "11210003",   // Conta Exterior
              "ZWELS": "T"           // Transferência Swift
            }
          ],
          
          "E1KNVVM": [
            {
              "VKORG": "2000",
              "VTWEG": "99",         // Canal Exportação
              "SPART": "30",
              "WAERS": "USD",        // Moeda Dólar
              "INCO1": "FOB",        // Incoterms (Obrigatório)
              "INCO2": "NEW YORK",   
              "E1KNVIM": [
                { "ALAND": "BR", "TATYP": "IBRX", "TAXKD": "0" } 
              ]
            }
          ]
        }
      }
    }
  ],
  Fornecedor: [
    // Fornecedor Nacional PJ (Padrão)
    {
      "ADRMAS03": {
        "E1ADRMAS": {
          "OBJ_TYPE": "LFA1",
          "CONTEXT": "0001",
          "E1BPAD1VL": [{
            "NAME": "INDÚSTRIA METALÚRGICA DO SUL LTDA",
            "NAME_2": "FILIAL SC",
            "STREET": "RODOVIA BR 101",
            "HOUSE_NO": "KM 40",
            "POSTL_COD1": "89200-000",
            "CITY": "JOINVILLE",
            "REGION": "SC",
            "COUNTRY": "BR",
            "LANGU": "P",
            "TAXJURCODE": "SC 4209102" // Domicílio Fiscal (Obrigatório)
          }],
          "E1BPADSMTP": [{ "E_MAIL": "vendas@metalurgicasul.com.br" }]
        }
      },
      "CREMAS06": {
        "E1LFA1M": { // --- DADOS GERAIS ---
          "KTOKD": "FORN",           // Grupo Contas Padrão
          "NAME1": "INDÚSTRIA METALÚRGICA DO SUL LTDA",
          "LAND1": "BR",
          "STCD1": "12345678000199", // CNPJ
          "STCD3": "251234567",      // Inscrição Estadual
          "STCD4": "45678901",       // Inscrição Municipal
          
          // --- DADOS DA EMPRESA (FINANCEIRO) ---
          "E1LFB1M": [{
             "BUKRS": "1000",
             "AKONT": "21100001",    // Fornecedores Nacionais
             "ZTERM": "0030",        // 30 Dias Líquido
             "ZWELS": "F",           // Forma Pagto (Boleto)
             "FDGRV": "A1"           // Grp Tesouraria
          }],

          // --- DADOS DE COMPRAS ---
          "E1LFM1M": [{
             "EKORG": "1000",        // Org Compras
             "WAERS": "BRL",
             "WEBRE": "X",           // Verif. Fatura baseada em GR (Vital p/ MIRO)
             "LEBRE": "X",           // Verif. Fatura baseada em Serviços
             "KALSK": "BR01",        // Esquema de Cálculo
             "E1WYT3M": [            // Funções de Parceiro
                { "PARVW": "LF", "LIFN2": "", "PARZA": "000" }, // Fornecedor Principal
                { "PARVW": "RS", "LIFN2": "", "PARZA": "000" }  // Emissor Fatura (Mesmo do principal)
             ]
          }]
        }
      }
    },
    // Fornecedor Pessoa Física (Autônomo)
    {
      "ADRMAS03": {
        "E1ADRMAS": {
          "OBJ_TYPE": "LFA1",
          "E1BPAD1VL": [{
            "NAME": "MARIA DA SILVA CONSULTORIA",
            "STREET": "RUA DAS FLORES",
            "HOUSE_NO": "123",
            "CITY": "SAO PAULO",
            "POSTL_COD1": "01310-200",
            "REGION": "SP",
            "COUNTRY": "BR"
          }]
        }
      },
      "CREMAS06": {
        "E1LFA1M": {
          "KTOKD": "ZAUT",           // Grupo: Autônomos
          "NAME1": "MARIA DA SILVA CONSULTORIA",
          "LAND1": "BR",
          "STCD2": "98765432100",    // CPF vai no STCD2!
          "STKZN": "X",              // FLAG OBRIGATÓRIO: Pessoa Física
          
          "E1LFB1M": [{
             "BUKRS": "1000",
             "AKONT": "21100002",    // Conta Autônomos
             "ZTERM": "Z000",        // Pagto à Vista
             "ZWELS": "T",           // Forma Pagto: Transferência Bancária
             "HBKID": "ITAU"         // Banco da Empresa Pagadora
          }],

          // --- DADOS BANCÁRIOS (Para Transferência) ---
          "E1LFBKM": [{
             "BANKS": "BR",          // País do Banco
             "BANKL": "341",         // Código do Banco (Itaú)
             "BANKN": "12345-6",     // Conta Corrente
             "BKONT": "12",          // Dígito Verificador ou Chave
             "KOINH": "MARIA DA SILVA" // Titular da Conta
          }],

          "E1LFM1M": [{
             "EKORG": "1000",
             "WAERS": "BRL",
             "LEBRE": "X",           // Aceita Folha de Serviço
             "WEBRE": ""             // Geralmente autônomo não tem GR de material
          }]
        }
      }
    }
  ],
  Material: [
    // Material de Consumo / Peça (Indústria)
    {
      "MATMAS05": {
        "E1MARAM": [{
          "MATNR": "000000000000111211", // Código (com zeros à esquerda)
          "MBRSH": "M",                  // Setor: Mecânica
          "MTART": "ERSA",               // Tipo: Peça de Reposição
          "MEINS": "UN",                 // Unidade Base
          "MATKL": "YBR05",              // Grupo de Mercadorias
          "BRGEW": "0.150",              // Peso Bruto
          "GEWEI": "KG",                 // Unidade Peso
          "SPART": "05",                 // Setor de Atividade
          "TRAGR": "0001",               // Grupo de Transporte
          
          // DESCRIÇÃO CURTA (Obrigatório)
          "E1MAKTM": [{
              "MAKTX": "PORCA SEXTAVADA INOX 10MM",
              "SPRAS": "P",
              "SPRAS_ISO": "PT"
          }],

          // DADOS DE CENTRO (Logística)
          "E1MARCM": [{
              "WERKS": "1000",           // Centro (Planta)
              "LADGR": "0004",           // Grupo de Carregamento
              "MTVFP": "DR",             // Verif. Disponibilidade
              "BESKZ": "F",              // Tipo de Suprimento (F=Externo)
              
              // DADOS DE DEPÓSITO
              "E1MARDM": [{
                  "LGORT": "0001"        // Depósito (Almoxarifado)
              }]
          }],

          // TEXTOS LONGOS (Agora no lugar certo: Raiz do Material)
          "E1MTXHM": [
              {
                  "TDOBJECT": "MATERIAL",
                  "TDNAME": "000000000000111211", // Repete o cód material
                  "TDID": "GRUN",                 // ID: Texto Dados Básicos
                  "TDSPRAS": "P",
                  "SPRAS_ISO": "PT",
                  "E1MTXLM": [
                      { "TDLINE": "PORCA; TIPO: SEXTAVADA; MATERIAL: ACO INOX;" },
                      { "TDLINE": "ROSCA: ASME B1.1; NORMA: DIN 934" }
                  ]
              },
              {
                  "TDOBJECT": "MATERIAL",
                  "TDNAME": "000000000000111211",
                  "TDID": "BEST",                 // ID: Texto Pedido de Compras
                  "TDSPRAS": "P",
                  "SPRAS_ISO": "PT",
                  "E1MTXLM": [
                      { "TDLINE": "ATENCAO: EXIGIR CERTIFICADO DE QUALIDADE" }
                  ]
              }
          ]
        }]
      }
    },
    // Material de Revenda (Simples)
    {
      "MATMAS05": {
        "E1MARAM": [{
          "MATNR": "SKU-500",
          "MTART": "HAWA",           // Mercadoria de Revenda
          "MBRSH": "1",              // Varejo
          "MEINS": "PC",             // Peça
          "EAN11": "7891000200030",  // Código de Barras (EAN)
          
          "E1MAKTM": [{
              "MAKTX": "SMARTPHONE GALAXY 128GB",
              "SPRAS": "P"
          }],
          
          // DADOS DE VENDA (Para gerar Ordem de Venda)
          "E1MVEGM": [{
             "VKORG": "2000",        // Org Vendas
             "VTWEG": "10"           // Canal Distribuição
          }]
        }]
      }
    }
  ]
};