import React from "react";

function About() {
  return (
    <div className="container my-4">
      <h2 className="mb-3 text-center">About iNotebook</h2>
      <div className="accordion" id="aboutAccordion">

        {/* Accordion Item 1 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              What is iNotebook?
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              iNotebook is a cloud-based notebook app built with the MERN stack 
              (MongoDB, Express, React, Node.js). It helps you securely create, edit, 
              and manage your notes from anywhere.
            </div>
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Features
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              <ul>
                <li>Create, Edit, and Delete Notes</li>
                <li>Secure Authentication & Login</li>
                <li>Access your notes anytime, anywhere</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Accordion Item 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Technologies Used
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#aboutAccordion"
          >
            <div className="accordion-body">
              <strong>Frontend:</strong> React & Bootstrap <br />
              <strong>Backend:</strong> Node.js & Express <br />
              <strong>Database:</strong> MongoDB
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
