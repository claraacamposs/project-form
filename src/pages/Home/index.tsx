/* eslint-disable array-callback-return */
import React, { useState, FormEvent } from "react";
import LoadStatus from "../../components/LoadStatus";
import { Button, Input, InputMasked } from "../../components/FormElements";
import { Page, Form, ContentForm, Title, InputsContainer } from "./styles";
import { GlobalStyle } from "../../style/GlobalStyle";

type IErrorFormData = {
  fullName: boolean;
  Phone: boolean;
};

const Home = () => {
  const [statusForm, setStatusForm] = useState<
    "sucess" | "error" | "loading" | "none" | "invalid"
  >("none");

  const [formdata, setFormdata] = useState({
    fullName: "",
    Phone: "",
  });
  const [errors, setError] = useState<IErrorFormData>({
    fullName: false,
    Phone: false,
  });

  function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    setStatusForm("loading");

    if (handleInvalidInputs()) {
      setStatusForm("invalid");
      return;
    }
  }

  function handleInvalidInputs(): boolean {
    resetErrors();

    let hasErrors = false;
    let cloneErrorForm = errors;

    const arrayObjForm = [
      { name: "fullName", value: formdata.fullName },
      { name: "Phone", value: formdata.Phone },
    ];

    arrayObjForm.map((element): void => {
      const { value } = element;

      if (isEmpty(value)) {
        cloneErrorForm = { fullName: true, Phone: true };
        hasErrors = true;
      }
    });

    setError(cloneErrorForm);

    return hasErrors;
  }

  function resetErrors() {
    setError({
      fullName: false,
      Phone: false,
    });
  }

  function isEmpty(value: any): boolean {
    if (value === null || String(value) === "" || String(value).length <= 0) {
      return true;
    }

    return false;
  }

  return (
    <>
      <Page>
        <Form onSubmit={handleSubmitForm}>
          <ContentForm>
            <Title>Cadastro</Title>

            <InputsContainer>
              <Input
                label="Nome completo"
                name="fullName"
                placeholder=""
                error={errors?.fullName}
                helperText={"Insira o nome completo"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    fullName: value,
                  });
                }}
              />

              <InputMasked
                mask={"(99) 9999-9999"}
                label="Contato"
                type="Pho"
                name="Phone"
                placeholder=""
                error={errors?.Phone}
                helperText={"Insira um telefone válido"}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    Phone: value,
                  });
                }}
              />
              <Button text="Cadastrar" type="submit" />
              <LoadStatus status={statusForm} />
            </InputsContainer>
          </ContentForm>
        </Form>
      </Page>
      <GlobalStyle />
    </>
  );
};

export default Home;
