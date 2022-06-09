import React, { cloneElement, useState } from "react"

const jsonToFormData = (json) => {
  try {
    const data = new FormData()

    for (let k in json) {
      data.append(k, json[k])
    }

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

const ErrorMessage = () => {
  return (
    <div style={{ color: "red" }}>
      <strong>url</strong> or <strong>siteUrl</strong> and{" "}
      <strong>formId</strong> are mandatory attributes
    </div>
  )
}
const normalizeResponse = (url, response) => {
  if (
      url.match(/wp-json\/contact-form-7\/v1\/contact-forms\/\d+\/feedback/)
  ) {
    console.log(response)
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
console.log(validationError);
  return {
      isSuccess,
      message,
      validationError
  };
};

const Cf7FormWrapper = ({ children, url }) => {
  const [isSent, setSent] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(null)
  const [fieldError,setFieldError] = useState([]);
  const apiUrl = url;

  const formSubmitHandler = (event, payload) => {
    event.preventDefault()

    setLoading(true)
    setError(null)

    fetch(apiUrl, {
      method: "POST",
      body: jsonToFormData(payload),
    })
      .then((resp) => resp.json())
      .then((response) => normalizeResponse(apiUrl, response))
      .then((resp) => {
        if (!resp.isSuccess) {
          setFieldError([resp.validationError]);
          throw resp.message
        }
        setSent(true);
        event.target.reset();
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
       
      })
  }

  const Form = cloneElement(children, {
    handler: formSubmitHandler,
    isLoading,
    isSent,
    hasError,
    fieldError
  })

  return <div>{url ? Form : <ErrorMessage />}</div>
}

export default Cf7FormWrapper