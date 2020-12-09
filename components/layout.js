import Head from "next/head";
import PropTypes from "prop-types";

import { Container } from "reactstrap";
import Navbar from "./navbar";

import { motion } from "framer-motion";

const animationList = [
  {
    initial: { opacity: 0, x: -1200 },
    exit: { opacity: 0, x: -1000 },
  },
  {
    initial: { opacity: 0, x: -1200 },
    exit: { opacity: 0, x: 1000 },
  },
];

export default function Layout({ children, title, animation }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <motion.div
        className="mt-4"
        animate={{ opacity: 1, x: 0 }}
        initial="initial"
        exit="exit"
        variants={animationList[animation]}
      >
        <Container>{children}</Container>
      </motion.div>
    </>
  );
}

Layout.PropTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

Layout.defaultProps = {
  title: "Laruno.com Test",
  children: null,
};
