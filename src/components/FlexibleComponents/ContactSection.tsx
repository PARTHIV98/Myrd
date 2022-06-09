import Heading from "components/Heading";
import React from "react";
import styles from "scss/components/FlexibleComponentStyles/ContactSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { client } from "client";
import Cf7FormWrapper from "./cf7-form-wrapper";
import { useEffect, useRef, useState } from "react";

interface Props {
  QueryData: any;
}
interface Form{ 
  handler: any; 
  isLoading: Boolean;
  isSent:Boolean;
  hasError: any;
  inputData:any;
}

const Form = function Form({ handler, isLoading, isSent, hasError,inputData,fieldError }) {
  const [formState, setFormState] = useState({})

  const handleFieldChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    })
  }
  const handleFileChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.files[0],
    })
  }
  const handleFormSubmit = (e) => {
    handler(e, formState)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      

      <div className="form-fields row d-flex contact-form">
      {inputData?.properties?.form?.fields.map((item,index) => {
      const inputName = item?.name;
      const inputType = item?.type;
      const labels = item?.labels;
      // console.log(item);
      return(
      <div className="form-field col" key={index}>
        <div className="form-field-wrap">
          <span className={`wpcf7-form-control-wrap ${inputName}`}>
          
            {inputType == "select" ? (
              <select onChange={(e) => handleFieldChange(inputName, e)} name={inputName} placeholder={labels[0]} className="outline-style">
                {
                  labels.map((lbl,vl)=>(
                    <option value={lbl} key={vl}>{lbl}</option>
                  ))
                }
            </select>
            ) : inputType == "file" ? (
              <input type={`${inputType}`} name={inputName} onChange={(e) => handleFileChange(inputName, e)} placeholder={`${item.labels}`} className="wpcf7-form-control wpcf7-text"/>
            ) : inputType == "textarea" ? (
            <textarea name={inputName} onChange={(e) => handleFieldChange(inputName, e)} placeholder={`${item.labels}`} className="wpcf7-form-control wpcf7-text"/>
            ) : inputType == "submit" ? (
            <button type="submit" className="commonButton commonButtonOutlined form-submit-button">{item.values}</button>
            ) : (
            <>
            <input onChange={(e) => handleFieldChange(inputName, e)}  value={formState[inputName]} name={inputName} type={`${inputType}`} placeholder={`${item.labels}`} className="outline-style"/>
            </>
            )
            }
            {fieldError.map((item,index)=> 
              (<span className="requiredError" key={index}>{item[inputName]}</span>)
            )}
          </span>
        </div>
      </div>
      )})}
    </div>
      <div className="form-status">
      {isLoading ? ( <div>{isLoading ? "Loading" : "false"}</div>): ""}
      {isSent ? ( <div className="success form-status-info">{isSent ? "Sent" : "false"}</div>):""}
      {hasError ? (<div className="alert form-status-info">{hasError || "null"}</div>) :""}
      
      </div>
    </form>
  )
}
/*
const stripHtml = (string) => string.replace(/(<([^>]+)>)/gi, "");

const normalizeResponse = (url, response) => {
    if (
        url.match(/wp-json\/contact-form-7\/v1\/contact-forms\/\d+\/feedback/)
    ) {
        return normalizeContactForm7Response(response);
    }


    return {
        isSuccess: false,
        message: "Are you submitting to the right URL?",
        validationError: {}
    };
};


const normalizeContactForm7Response = (response) => {
    const isSuccess = response.status === "mail_sent";
    const message = response.message;
    const validationError = isSuccess
        ? {}
        : Object.fromEntries(
              response.invalid_fields.map((error) => {
                  const key = /cf7[-a-z]*.(.*)/.exec(error.into)[1];

                  return [key, error.message];
              })
          );

    return {
        isSuccess,
        message,
        validationError
    };
};
function formToJSON( elem ) {
  var current, entries, item, key, output, value;
  output = {};
  entries = elem.entries();
  // Iterate over values, and assign to item.
  while ( item = entries.next().value )
    {
      // assign to variables to make the code more readable.
      key = item[0];
      value = item[1];
      // Check if key already exist
      if (Object.prototype.hasOwnProperty.call( output, key)) {
        current = output[ key ];
        if ( !Array.isArray( current ) ) {
          // If it's not an array, convert it to an array.
          current = output[ key ] = [ current ];
        }
        current.push( value ); // Add the new value to the array.
      } else {
        output[ key ] = value;
      }
    }
    return JSON.stringify( output );
  }

const getFormJSON = (form) => {
  const data = new FormData();
  // return Array.from(data.keys()).reduce((result, key) => {
  //   result[key] = data.get(key);
  //   return result;
  // }, {});

};


const formSubmissionHandler = async (event) => {
  
    event.preventDefault();
    const formElement2 = event.target;
    console.log(formElement2);
    const formElement = event.target.elements[0],
        { action, method } = formElement,
        body = new FormData();
      //   for (let key in formElement) {
      //     Array.isArray(formElement[key])
      //         ? formElement[key].forEach(value => body.append(key + '[]', value))
      //         : body.append(key, formElement[key]) ;
      // }
      // for (const [key, value] of Object.entries(formElement) {
      //   console.log(key, value);
      //   body.append(key, value);
      // });
      Object.keys(formElement).forEach(fieldName => {
        
        body.append(fieldName, formElement[fieldName]);
        console.log(fieldName, formElement[fieldName]);
      })
      // for (const [key, value] of Object.entries(body)) {
      //     console.log(key, value);
      //   };
        console.log( Object.keys(formElement));
        // for(let [name, value] of formElement) {
        //   // alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
        //   body.append(name,value);
        // }
        // Array.from(formElement).forEach((name,value) => {
        //   if (!name) return;
        //   body.append(name,value);
        // });
        // JSON.stringify(body)

        // Object.keys(formElement).forEach(key => body.append(key, formElement[key]));
        // Object.keys(formElement).forEach(fieldName => {
        //   // console.log(fieldName, formElement[fieldName]);
        //   body.append(fieldName, formElement[fieldName]);
        // })
        
// let formDatss = body.entries();
// const keys = Object.keys(formDatss);  
// keys.forEach((key, index) => {
//   console.log(`${key}: ${formDatss[key]}`);
// });    
//  console.log(formDatss);
        // await fetch(action, {
        // method : "POST",
        // body,
        // headers: {
                // 'accept':'application/json',
                // "Content-Type": "application/json",
                // "Access-Handler":"Authorization:null",
    //     }
    // })
    //     .then((response) => response.json())
    //     .then((response) => normalizeResponse(action, response))
    //     .then((response) => {
    //         alert(response.message);

    //         if (response.isSuccess) {
    //             formElement.reset();
    //         }
    //     })
    //     .catch((error) => {
    //         alert("Check the console for the error details.");
    //         console.log(error);
    //     });
};

*/


function ContactSection({ QueryData }: Props): JSX.Element{
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const Description = QueryData?.description;
  const MainImage = QueryData?.image?.sourceUrl();
  const { useQuery } = client;
  const address = useQuery().themeGeneralSettings?.generalThemeSettings?.address;
  const emailAddress = useQuery().themeGeneralSettings?.generalThemeSettings?.emailAddress;
  const phone1 = useQuery().themeGeneralSettings?.generalThemeSettings?.phone1;
  const phone2 = useQuery().themeGeneralSettings?.generalThemeSettings?.phone2;
  const socialMediaList = useQuery().themeGeneralSettings?.generalThemeSettings?.socialMediaList;
  const [formInput,setFormInputs] = useState({});
  const contactFormId = useQuery().themeGeneralSettings?.generalThemeSettings?.contactFormId;
  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${contactFormId}`,{
      method:"GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFormInputs(data)})
  }, [])
  return (
    <section className={styles.contactsection} style={{
        backgroundImage: `url(${MainImage})`
      }}>
      

        <div className="container">
          <div className={styles.contactsecinner}>
            {MainHeading ? (
              <Heading level={HeadingTag} className={styles.ctatitle}>
                <div dangerouslySetInnerHTML={{ __html: MainHeading ?? "" }} />
              </Heading>
            ) : (
              ""
            )}
            {Description ? (
            <div dangerouslySetInnerHTML={{ __html: Description ?? "" }} />
            ) : (
                ""
              )}
          </div>
            <div className={`${styles.contactInfoBlock} row d-flex`}>
                <div className={`${styles.ContactInfoCol} col bg-dark`}>
                    <div className={styles.contactInfoData}>
                        <h3>Get in touch with us</h3>

                        {address || emailAddress || phone1 || phone2  ? (
                        <ul className="company-info">
						{address ? (	<li><a href="#"><i className="fas fa-map-marker-alt"></i>{address}</a></li>):""}
            {emailAddress ? (<li><a href={`mailto:${emailAddress}`}><i className="far fa-envelope"></i>{emailAddress}</a></li>):""}
            {phone1 ? ( <li><a href={`tel:+${phone1.replace(/-|\s/g,"")}`}><i className="fas fa-headset"></i>+{phone1}</a></li>):""}
            {phone2 ? ( <li><a href={`tel:+${phone2.replace(/-|\s/g,"")}`}>+{phone2}</a></li>):""}
				        </ul>):""
} {socialMediaList ? (
                        <ul className={styles.social_media}>
                          {socialMediaList.map((link,index) => (
                            <li key={index}>
                            <Link href={String(link.socialLink)}>
                              <a className={styles[link.socialName]} target="_blank">
                              <i className={link.socialIcon}></i>
                              </a>
                            </Link>
                          </li>
                            ))}
					    </ul>):""}
                    </div>
                </div>
              <div className={`${styles.ContactInfoCol} col`}>
                  <div className={styles.contactForm}>
                  <h3>Get in touch with us</h3>
                  {/*<form method="post" action="http://localhost/myriadsolutionz/wp-json/contact-form-7/v1/contact-forms/455/feedback" onSubmit={formSubmissionHandler}>
						<div className="alert alert-success d-none" role="alert">
							Your enquiry has been received at Myriad Solutionz. We will get back to you with 2 business days. Thank you!
						</div>
						<div className="alert alert-danger d-none" role="alert">
							Please Try Again.
						</div>
						<div className="row">
							<div className="col-md-12 col-sm-12 col-12">
								<div className="form-group">
									<input type="text" className="form-control" name="your-name" placeholder="Name" required/>
									<div className="invalid-feedback">Please enter Name.</div>
								</div>
							</div>
							<div className="col-md-6 col-sm-6 col-6 pr-1">
								<div className="form-group">
									<input type="email" className="form-control" name="your-email" placeholder="Email" required/>
									<div className="invalid-feedback">Please enter email.</div>
								</div>
							</div>
							
							
							<div className="col-md-3 col-sm-3 col-3 pl-1">
                <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
								<input type="hidden" value="save_contact_data" name="action" />
							</div>
						</div>
					</form>*/}
          <Cf7FormWrapper url={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${contactFormId}/feedback`}>
            <Form handler={undefined} isLoading={false} isSent={false} hasError={false} inputData={formInput} fieldError={[]}/>
          </Cf7FormWrapper>
                  </div>
              </div>
              <div className={`${styles.ContactInfoCol} col`}>
                  <div className={styles.contactMap}>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7343.711550625083!2d72.55432187358568!3d23.029067139798997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e846cec1381b7%3A0xc8c7f23486371bb8!2sMyriad%20Solutionz!5e0!3m2!1sen!2sin!4v1652033201565!5m2!1sen!2sin" width="600" height="450"  style={{border: 0}}  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen></iframe>
                  </div>
              </div>
          </div>
        </div>
    
    </section>
  );
}

export default ContactSection;

