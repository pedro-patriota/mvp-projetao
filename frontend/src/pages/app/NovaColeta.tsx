import React from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import { Button, Input, Radio, RadioGroup, Typography } from "@mui/joy";

export default function NovaColeta() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        flex: 1,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "100%",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#d1d5db",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          overflowY: "auto",
        }}
      >
        <FormControl
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <FormLabel>Nome</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Nome..." />
              <FormLabel>Telefone</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Telefone..." />
              <FormLabel>Naturalidade</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Naturalidade..." />
              <FormLabel>CPF</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="CPF..." />
              <FormLabel>Identidade</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Identidade..." />
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>Orgão</FormLabel>
                  <Input sx={{ width: "100%" }} placeholder="Email..." />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>UF</FormLabel>
                  <Input sx={{ width: "100%" }} placeholder="Email..." />
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <FormLabel>Status do individuo</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Status..." />
              <FormLabel>Sexo</FormLabel>
              <RadioGroup
                defaultValue="-"
                orientation="horizontal"
                sx={{
                  gap: "0.5rem",
                }}
              >
                <Radio value="sim" label="Masculino" />
                <Radio value="nao" label="Feminino" />
              </RadioGroup>
              <FormLabel>Endereço</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Endereço..." />
              <FormLabel>Municipio</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Município..." />
              <FormLabel>Bairro</FormLabel>
              <Input sx={{ width: "100%" }} placeholder="Bairro..." />
              <Box
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>UF</FormLabel>
                  <Input sx={{ width: "100%" }} placeholder="UF..." />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormLabel>CEP</FormLabel>
                  <Input sx={{ width: "100%" }} placeholder="CEP..." />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography>
              Você testemunhou a coleta das amostras biologicas do suposto pai
              do individuo que se quer determinar a paternidade?
            </Typography>
            <RadioGroup
              defaultValue="-"
              orientation="horizontal"
              sx={{
                gap: "0.5rem",
              }}
            >
              <Radio value="sim" label="Sim" />
              <Radio value="nao" label="Não" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography>Você tem irmão gêmeo?</Typography>
            <RadioGroup
              defaultValue="-"
              orientation="horizontal"
              sx={{
                gap: "0.5rem",
              }}
            >
              <Radio value="sim" label="Sim" />
              <Radio value="nao" label="Não" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography sx={{ wordBreak: "break-all" }}>
              Algum parente biologico do susposto pai poderia ser eventualmente
              considerado como suposto pai do examinado que se quer determinar a
              paternidade?
            </Typography>
            <RadioGroup
              defaultValue="-"
              orientation="horizontal"
              sx={{
                gap: "0.5rem",
              }}
            >
              <Radio value="sim" label="Sim" />
              <Radio value="nao" label="Não" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography>
              Você tem parentesco com o susposto pai do examinando que se quer
              determinar a paternidade?
            </Typography>
            <RadioGroup
              defaultValue="-"
              orientation="horizontal"
              sx={{
                gap: "0.5rem",
              }}
            >
              <Radio value="sim" label="Sim" />
              <Radio value="nao" label="Não" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography>Transplante de medula?</Typography>
            <RadioGroup
              defaultValue="-"
              orientation="horizontal"
              sx={{
                gap: "0.5rem",
              }}
            >
              <Radio value="sim" label="Sim" />
              <Radio value="nao" label="Não" />
            </RadioGroup>
            <Typography>Transfusão de sangue?</Typography>
            <RadioGroup
              defaultValue="-"
              orientation="horizontal"
              sx={{
                gap: "0.5rem",
              }}
            >
              <Radio value="sim" label="Sim" />
              <Radio value="nao" label="Não" />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              flexDirection: "row",
              gap: "1rem",
            }}
          >
            <Button variant="soft">Limpar</Button>
            <Button>Finalizar</Button>
          </Box>
        </FormControl>
      </Box>
    </Box>
  );
}
