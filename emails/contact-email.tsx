import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  message: string;
}

export const ContactEmail = ({ name, email, message }: ContactEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={section}>
            <Heading style={h1}>New Contact Form Submission</Heading>
            <Hr style={hr} />

            <Text style={label}>Name:</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>

            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>

            <Hr style={hr} />
            <Text style={footer}>
              This email was sent from your portfolio contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const section = {
  padding: "0 48px",
};

const h1 = {
  color: "#000000",
  fontSize: "32px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
};

const label = {
  color: "#8b8b8b",
  fontSize: "14px",
  fontWeight: "500",
  marginBottom: "4px",
  marginTop: "24px",
};

const value = {
  color: "#000000",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "0",
};

const messageStyle = {
  color: "#000000",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8b8b8b",
  fontSize: "12px",
  lineHeight: "1.5",
  marginTop: "12px",
};

export default ContactEmail;
