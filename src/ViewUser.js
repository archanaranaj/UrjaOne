
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Button, Input, Image } from 'antd';
import { ArrowBackIos } from '@mui/icons-material';

const { Text, Title } = Typography;

const ViewUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Debug: log incoming state
  console.log('ViewTicket state:', state);

  // Defensive fallback ticket
  const ticket = state?.ticket ?? {
    ticketNo: 'TICKET123',
    userId: 'USR002',
    ticketMajorType: "Service",
    ticketMinorType: "Delay",
    chat: [
      { from: 'user', message: 'Hello, I have an issue with the service.' },
      { from: 'admin', message: 'Hi, can you please share a screenshot?' },
      { from: 'user', message: 'Sure, attaching it here.', image: '/solar.jpg' },
      { from: 'admin', message: 'Thanks, we are checking it.' },
      { from: 'user', message: 'Any update?' },
      { from: 'admin', message: 'Yes, it’s resolved. Please verify.' },
    ],
  };

  // Defensive chat array
  const chat = Array.isArray(ticket.chat) && ticket.chat.length > 0
  ? ticket.chat
  : [
      { from: 'user', message: 'Hello, I have an issue with the service.' },
      { from: 'admin', message: 'Hi, can you please share a screenshot?' },
      { from: 'user', message: 'Sure, attaching it here.', image: '/solar.jpg' },
      { from: 'admin', message: 'Thanks, we are checking it.' },
    ];


  if (!chat.length) {
    console.warn('No chat data found!');
  }

  return (
    <div style={{ padding: '2px 2px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ background: '#fff', borderRadius: 8, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Button
            type="text"
            icon={<ArrowBackIos style={{ fontSize: 20 }} />}
            onClick={() => navigate(-1)}
            style={{ padding: 0 }}
          />
          <Title level={3} style={{ margin: 0, marginLeft: 10 }}>
            Ticket Details
          </Title>
        </div>

        <Card style={{ marginBottom: 16 }}>
          <Text strong>Ticket No:</Text> {ticket.ticketNo} <br />
          <Text strong>User ID:</Text> {ticket.userId} <br />
          <Text strong>Major Type:</Text> {ticket.ticketMajorType}<br/>
          <Text strong>Minor Type:</Text>{ticket.ticketMinorType}
        </Card>

        <Card style={{ background: '#fff', minHeight: 300 }}>
          <Title level={4}>Chat</Title>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {chat.length > 0 ? (
              chat.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    background: msg.from === 'user' ? '#e6f7ff' : '#f9f0ff',
                    padding: 10,
                    borderRadius: 8,
                    marginBottom: 16,
                    maxWidth: '70%',
                    alignSelf: 'flex-start',
                    wordBreak: 'break-word',
                  }}
                >
                  <Text strong>{msg.from === 'user' ? 'User' : 'Admin'}</Text>
                  <div style={{ marginTop: 6 }}>
                    {msg.message}
                    {msg.image && (
                      <div style={{ marginTop: 6 }}>
                        <Image
                          src={msg.image.startsWith('http') ? msg.image : `${window.location.origin}${msg.image}`}
                          width={120}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <Text type="secondary">No chat messages available.</Text>
            )}
          </div>
        </Card>

        <Card style={{ marginTop: 16 }}>
           <Title level={4}>Add Reply</Title>
          <Input.TextArea rows={3} placeholder="Type your reply..." />
          <Button type="primary" style={{ marginTop: 8 }}>
            Send
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ViewUser;
