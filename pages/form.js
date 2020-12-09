import { useState, useEffect } from "react";
import Layout from "../components/layout";
import {
  Button,
  Form,
  FormGroup,
  Input,
  FormText,
  FormFeedback,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import { useQuery, useMutation } from "react-query";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Home() {
  const headersGET = {
    headers: {
      key: "32dd9172c6aeb5d3910ea2c725cc0883",
    },
  };

  const {
    isLoading: loadingProvince,
    error: errorProvince,
    data: province,
  } = useQuery(
    "getProvinceData",
    async () =>
      await axios.get("http://api.rajaongkir.com/starter/province", headersGET)
  );

  const { handleSubmit, getFieldProps, errors, touched, values } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phone: "",
      province: null,
      city: null,
      street: "",
    },

    validationSchema: yup.object().shape({
      firstname: yup
        .string()
        .required("First name is required")
        .min(3, "Too short!"),
      lastname: yup.string(),
      phone: yup
        .string()
        .required("Phone number is required")
        .min(10, "Too short!"),
      province: yup.mixed().required("Select a province address!"),
      city: yup.mixed().required("Select a city address!"),
      street: yup
        .string()
        .required("Street address is required")
        .min(8, "Too short!"),
    }),

    onSubmit: (values) => {
      handleAction(values);
    },
  });

  const {
    isLoading: loadingCity,
    error: errorCity,
    data: city,
    refetch: refetchCity,
  } = useQuery(
    "getCityData",
    async () =>
      await axios.get(
        `http://api.rajaongkir.com/starter/city?province=${values.province}`,
        headersGET
      )
  );

  const [handleAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      let body = new FormData();
      body.append("origin", values.city);
      body.append("destination", Math.floor(Math.random() * 20));
      body.append("weight", 1000);
      body.append("courier", "jne");

      const res = await axios.post(
        "https://api.rajaongkir.com/starter/cost",
        body,
        config
      );
      console.log(res.data.rajaongkir);
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    refetchCity();
  }, [values.province]);

  return (
    <Layout title="Laruno.com Test | Form" animation={1}>
      <Form
        style={{
          maxWidth: 576,
          margin: "auto",
          display: "block",
          marginTop: "4rem",
        }}
        onSubmit={handleSubmit}
      >
        <h4 style={{ fontWeight: 700, textAlign: "center" }}>
          Consume API from RajaOngkir
        </h4>
        <Row className="mt-4">
          <Col>
            <FormGroup>
              <Input
                name="firstname"
                placeholder="First Name"
                valid={touched.firstname && !errors.firstname}
                invalid={touched.firstname && !!errors.firstname}
                {...getFieldProps("firstname")}
              />
              <FormFeedback>
                {touched.firstname && errors.firstname}
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input
                name="lastname"
                placeholder="Last Name (Optional)"
                valid={touched.lastname && !errors.lastname}
                {...getFieldProps("lastname")}
              />
              <FormText>* Optional</FormText>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            name="phone"
            type="number"
            placeholder="Phone Number | ex: +6281319796877"
            valid={touched.phone && !errors.phone}
            invalid={touched.phone && !!errors.phone}
            {...getFieldProps("phone")}
          />
          <FormFeedback>{touched.phone && errors.phone}</FormFeedback>
        </FormGroup>
        <Row className="mt-1">
          <Col>
            <FormGroup>
              <Input
                type="select"
                name="province"
                placeholder="Province"
                valid={touched.province && !errors.province}
                invalid={touched.province && !!errors.province}
                {...getFieldProps("province")}
              >
                <option>Select a province</option>
                {!loadingProvince && !errorProvince ? (
                  province.data.rajaongkir.results.length > 0 ? (
                    province.data.rajaongkir.results.map((res) => (
                      <option value={res.province_id}>{res.province}</option>
                    ))
                  ) : (
                    <option>Loading .......</option>
                  )
                ) : (
                  <option>Loading .......</option>
                )}
              </Input>
              <FormFeedback>{touched.province && errors.province}</FormFeedback>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Input
                type="select"
                name="city"
                placeholder="City"
                valid={touched.city && !errors.city}
                invalid={touched.city && !!errors.city}
                {...getFieldProps("city")}
                disabled={!values.province}
              >
                <option>Select a city</option>
                {!loadingCity && !errorCity ? (
                  city.data.rajaongkir.results.length > 0 ? (
                    city.data.rajaongkir.results.map((res) => (
                      <option value={res.city_id}>
                        {res.type + " " + res.city_name}
                      </option>
                    ))
                  ) : (
                    <option>Loading .......</option>
                  )
                ) : (
                  <option>Loading .......</option>
                )}
              </Input>
              <FormFeedback>{touched.city && errors.city}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Input
            type="textarea"
            name="street"
            placeholder="Street address | ex: JL. Pegangsaan Timur No.62"
            valid={touched.street && !errors.street}
            invalid={touched.street && !!errors.street}
            {...getFieldProps("street")}
          />
          <FormFeedback>{touched.street && errors.street}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="primary" block>
            {isLoading ? <Spinner color="light" /> : "Submit"}
          </Button>
        </FormGroup>
      </Form>
    </Layout>
  );
}
