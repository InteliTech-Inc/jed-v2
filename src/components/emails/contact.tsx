import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Section, Text } from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactFormEmail = ({ name, email, subject, message }: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img src={`https://ik.imagekit.io/jednk/logo_white?updatedAt=1746008984026`} width="120" height="50" alt="JED" />
          <Hr style={hr} />
          <Text style={paragraph}>Hello JED Support Team,</Text>
          <Text style={paragraph}>You have received a new contact form submission. Here are the details:</Text>
          <Section style={detailsBox}>
            <Text style={detailText}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={detailText}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={detailText}>
              <strong>Subject:</strong> {subject}
            </Text>
          </Section>
          <Section style={messageBox}>
            <Text style={detailText}>
              <strong>Message:</strong>
            </Text>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Button style={button} href={`mailto:${email}`}>
            Reply to {name}
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>This email was sent from the contact form on the JED website. Please respond to the sender's email address directly.</Text>
          <Text style={paragraph}>— JED Support Team</Text>
          <Hr style={hr} />
          <Text style={footer}>JED | Fast and Modern online event management platform</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail;

const main = {
  backgroundColor: "#101b15",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#101b15",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#80c85096",
  margin: "20px 0",
};

const paragraph = {
  color: "#fff",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const detailsBox = {
  borderRadius: "8px",
  margin: "20px 0",
};

const messageBox = {
  borderRadius: "8px",
  margin: "20px 0",
};

const detailText = {
  color: "#fff",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0",
};

const messageText = {
  color: "#fff",
  fontSize: "16px",
  lineHeight: "24px",
  whiteSpace: "pre-wrap" as const,
};

const button = {
  backgroundColor: "#80c850",
  borderRadius: "5px",
  color: "#101b15",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#fffe",
  fontSize: "12px",
  lineHeight: "16px",
};
