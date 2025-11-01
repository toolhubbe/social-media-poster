/**
 * Event Create Page
 * 
 * Bestandslocatie: frontend/src/pages/events/EventCreate.jsx
 * Volledige pad: C:/Users/DASAP/Documents/SAAS - SOFTWARE/N8N software building/SOCIAL MEDIA POSTER TOOL/social-media-poster/frontend/src/pages/events/EventCreate.jsx
 * 
 * Main page die de 2-stap event creation flow orkestreert:
 * Stap 1: Customer Selector
 * Stap 2: Event Form
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

  // Check if we're returning from customer creation with a selected customer
  React.useEffect(() => {
    const customerId = searchParams.get('customerId');
    const customerName = searchParams.get('customerName');
    
    if (customerId && customerName) {
      // Automatically select the newly created customer and go to step 2
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
    // Show success and redirect to events list
    console.log('Event successfully created:', event);
    
    // You could optionally redirect to the event detail page:
    // navigate(`/events/${event.event_id}`);
    
    // Or redirect to events list:
    navigate('/events', { 
      state: { 
        message: 'Event succesvol aangemaakt!',
        eventId: event.event_id 
      }
    });
  };

  return (
    <div className="event-create-page">
      {/* Progress Indicator */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Klant selecteren</div>
          </div>
          
          <div className="progress-line">
            <div className={`progress-line-fill ${step >= 2 ? 'filled' : ''}`}></div>
          </div>
          
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Event details</div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="step-content">
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

      {/* Styles */}
      <style jsx>{`
        .event-create-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%);
          padding: 2rem 0;
        }

        .progress-container {
          max-width: 600px;
          margin: 0 auto 2rem auto;
          padding: 0 1rem;
        }

        .progress-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          position: relative;
          transition: all 0.3s;
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #e0e0e0;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.25rem;
          transition: all 0.3s;
        }

        .progress-step.active .step-number {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          transform: scale(1.1);
        }

        .progress-step.completed .step-number {
          background: #4caf50;
          color: white;
        }

        .step-label {
          font-size: 0.875rem;
          color: #666;
          font-weight: 500;
          text-align: center;
          white-space: nowrap;
        }

        .progress-step.active .step-label {
          color: #667eea;
          font-weight: 600;
        }

        .progress-step.completed .step-label {
          color: #4caf50;
        }

        .progress-line {
          flex: 1;
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          min-width: 100px;
        }

        .progress-line-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          transition: width 0.5s ease-in-out;
        }

        .progress-line-fill.filled {
          width: 100%;
        }

        .step-content {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .event-create-page {
            padding: 1rem 0;
          }

          .progress-container {
            padding: 0 0.5rem;
            margin-bottom: 1rem;
          }

          .progress-bar {
            padding: 1rem;
          }

          .step-number {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .step-label {
            font-size: 0.75rem;
          }

          .progress-line {
            min-width: 50px;
          }
        }

        @media (max-width: 480px) {
          .progress-bar {
            flex-direction: column;
            gap: 1.5rem;
          }

          .progress-line {
            width: 4px;
            height: 50px;
            min-width: auto;
          }

          .progress-line-fill {
            width: 100%;
            height: 0%;
          }

          .progress-line-fill.filled {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default EventCreate;
