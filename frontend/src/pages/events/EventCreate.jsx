/**
 * Event Create Page - MODERN VERSION
 * 
 * Bestandslocatie: frontend/src/pages/events/EventCreate.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/events/EventCreate.jsx
 * 
 * ✅ MODERNIZED: Gradient progress bar, glassmorphism, modern styling
 * ✅ FUNCTIONALITEIT: 100% behouden - alleen styling aangepast
 */

import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CustomerSelector from '../../components/events/CustomerSelector';
import EventForm from '../../components/events/EventForm';

const EventCreate = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  React.useEffect(() => {
    const customerId = searchParams.get('customerId');
    const customerName = searchParams.get('customerName');
    
    if (customerId && customerName) {
      setSelectedCustomer({
        customer_id: parseInt(customerId),
        company_name: customerName,
        full_name: customerName
      });
      setStep(2);
    }
  }, [searchParams]);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setStep(2);
  };

  const handleBackToCustomerSelector = () => {
    setSelectedCustomer(null);
    setStep(1);
  };

  const handleEventCreated = (event) => {
    console.log('Event successfully created:', event);
    
    navigate('/events', { 
      state: { 
        message: 'Event succesvol aangemaakt!',
        eventId: event.event_id 
      }
    });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Progress Container */}
        <div style={styles.progressCard}>
          <div style={styles.progressBar}>
            <div style={{
              ...styles.progressStep,
              ...(step >= 1 ? styles.progressStepActive : {}),
              ...(step > 1 ? styles.progressStepCompleted : {})
            }}>
              <div style={{
                ...styles.stepNumber,
                ...(step >= 1 ? styles.stepNumberActive : {}),
                ...(step > 1 ? styles.stepNumberCompleted : {})
              }}>
                {step > 1 ? '✓' : '1'}
              </div>
              <div style={{
                ...styles.stepLabel,
                ...(step >= 1 ? styles.stepLabelActive : {})
              }}>
                Klant selecteren
              </div>
            </div>
            
            <div style={styles.progressLine}>
              <div style={{
                ...styles.progressLineFill,
                ...(step >= 2 ? styles.progressLineFilled : {})
              }}></div>
            </div>
            
            <div style={{
              ...styles.progressStep,
              ...(step >= 2 ? styles.progressStepActive : {})
            }}>
              <div style={{
                ...styles.stepNumber,
                ...(step >= 2 ? styles.stepNumberActive : {})
              }}>
                2
              </div>
              <div style={{
                ...styles.stepLabel,
                ...(step >= 2 ? styles.stepLabelActive : {})
              }}>
                Event details
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div style={styles.stepContent}>
          {step === 1 && (
            <CustomerSelector onCustomerSelect={handleCustomerSelect} />
          )}

          {step === 2 && selectedCustomer && (
            <EventForm
              customer={selectedCustomer}
              onBack={handleBackToCustomerSelector}
              onSuccess={handleEventCreated}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  progressCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '32px',
    marginBottom: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    animation: 'fadeIn 0.5s ease-out',
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
  },
  progressStep: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    transition: 'all 0.3s ease',
  },
  progressStepActive: {
    transform: 'scale(1.05)',
  },
  progressStepCompleted: {},
  stepNumber: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'rgba(226, 232, 240, 0.5)',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    fontSize: '24px',
    transition: 'all 0.3s ease',
    border: '3px solid rgba(226, 232, 240, 0.8)',
  },
  stepNumberActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
    border: '3px solid transparent',
    animation: 'pulse 2s ease-in-out infinite',
  },
  stepNumberCompleted: {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: 'white',
    boxShadow: '0 4px 20px rgba(67, 233, 123, 0.4)',
    border: '3px solid transparent',
  },
  stepLabel: {
    fontSize: '15px',
    color: '#94a3b8',
    fontWeight: '600',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  },
  stepLabelActive: {
    color: '#667eea',
    fontWeight: '800',
    fontSize: '16px',
  },
  progressLine: {
    flex: 1,
    height: '6px',
    background: 'rgba(226, 232, 240, 0.5)',
    borderRadius: '3px',
    position: 'relative',
    overflow: 'hidden',
    minWidth: '120px',
  },
  progressLineFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '0%',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    transition: 'width 0.5s ease-in-out',
    boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)',
  },
  progressLineFilled: {
    width: '100%',
  },
  stepContent: {
    animation: 'fadeIn 0.5s ease-in',
  },
};

export default EventCreate;
