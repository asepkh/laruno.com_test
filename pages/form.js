import { useEffect, useState } from "react";

import Layout from "../components/layout";
import Modal from "../components/modal";

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
  ListGroup,
  ListGroupItem,
  Badge,
  Table,
} from "reactstrap";

import { useQuery, useMutation } from "react-query";

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const origin = 457; // Tanggerang selatan
const weight = 1000; // 1000 Gram
const courier = "jne"; // JNE

export default function Home() {
  const [dataPost, setDataPost] = useState(null);
  const [modalState, setModal] = useState(null);

  const {
    isLoading: loadingProvince,
    error: errorProvince,
    data: province,
  } = useQuery(
    "getProvinceData",
    async () => await axios.get("https://kotaksabun.herokuapp.com/api/provinsi")
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
        `https://kotaksabun.herokuapp.com/api/kota/${values.province}`
      )
  );

  const [handleAction, { isLoading, error }] = useMutation(async (values) => {
    try {
      setModal(true);
      const res = await axios.get(
        `https://kotaksabun.herokuapp.com/api/ongkos/${origin}/${values.city}/${weight}/${courier}`
      );

      setDataPost(res.data.rajaongkir);
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
        autocomplete="off"
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
          <Button type="submit" color="primary" size="lg" block>
            {isLoading ? <Spinner color="light" /> : "Checkout"}
          </Button>
          <FormText>
            Origin from Gading Serpong Tanggerang Selatan to Guest Address With
            JNE Courier
          </FormText>
        </FormGroup>
      </Form>
      <Modal modalState={modalState} setModal={setModal} className="modal-xl">
        {dataPost !== null && (
          <>
            <div className={`circle-loader ${!isLoading && "load-complete"}`}>
              <div
                className="checkmark draw"
                style={{ display: !isLoading && "block" }}
              ></div>
            </div>
            <h3
              style={{
                color: "#5cb85c",
                fontWeight: 700,
                marginTop: 20,
                textAlign: "center",
              }}
            >
              Thank You, Order Success
            </h3>
            <hr />
            <Row>
              <Col sm="5">
                <ListGroup>
                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                    {values.firstname + " " + values.lastname}
                    <Badge color="success" pill>
                      NAME
                    </Badge>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                    {values.phone}
                    <Badge color="success" pill>
                      PHONE
                    </Badge>
                  </ListGroupItem>
                  <ListGroupItem className="d-flex justify-content-between align-items-center">
                    {dataPost.destination_details.province +
                      ", " +
                      dataPost.destination_details.type +
                      " " +
                      dataPost.destination_details.city_name +
                      ", " +
                      values.street}
                    <Badge color="success" pill>
                      ADDRESS
                    </Badge>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col sm="7">
                <Table striped>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Cost</th>
                      <th style={{ textAlign: "center" }}>Estimated Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPost.results[0].costs.length > 0 ? (
                      dataPost.results[0].costs.map((res, key) => (
                        <tr>
                          <td key={key}>
                            <b>JNE {res.service}</b> ({res.description})
                          </td>
                          <td style={{ fontWeight: 700 }}>
                            Rp.
                            {res.cost[0].value
                              .toString()
                              .split("")
                              .reverse()
                              .join("")
                              .match(/\d{1,3}/g)
                              .join(".")
                              .split("")
                              .reverse()
                              .join("")}
                            ,-
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {res.cost[0].etd} Day
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <b>TIDAK TERSEDIA</b>
                        </td>
                        <td>-</td>
                        <td style={{ textAlign: "center" }}>-</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </>
        )}
      </Modal>
    </Layout>
  );
}
