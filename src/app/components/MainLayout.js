"use client";

import Head from "next/head";
import Navbar from "./Navbar";
import Footer from '../components/Footer';


export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>YOLO - Karamelliserad Vit Choklad med Mandel</title>
        <meta
          name="description"
          content="Upptäck YOLOs utsökta karamelliserade vita choklad med krossad mandel, perfekt för alla tillfällen."
        />
      </Head>

      {/* Navbar at the top */}
      <Navbar />

      {/* Page content from each child */}
      <main className="full-h-screen">{children}</main>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
}
