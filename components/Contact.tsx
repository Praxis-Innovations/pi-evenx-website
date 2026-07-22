'use client';

import React, { useState } from 'react';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import Icon from '@/components/Icon';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [form_data, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [is_submitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [message_type, setMessageType] = useState<'success' | 'error' | ''>('');

  const validateForm = (): boolean => {
    const new_errors: FormErrors = {};

    if (!form_data.name.trim()) {
      new_errors.name = 'Name is required';
    }

    if (!form_data.email.trim()) {
      new_errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form_data.email)) {
      new_errors.email = 'Please enter a valid email address';
    }

    if (!form_data.subject.trim()) {
      new_errors.subject = 'Subject is required';
    }

    if (!form_data.message.trim()) {
      new_errors.message = 'Message is required';
    }

    setErrors(new_errors);
    return Object.keys(new_errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(buildApiUrl(ENDPOINTS.CONTACT_SUBMIT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form_data.name.trim(),
          email: form_data.email.trim(),
          subject: form_data.subject.trim(),
          message: form_data.message.trim(),
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setMessage('Thank you for your message! We\'ll get back to you soon.');
        setMessageType('success');

        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      } else {
        const error_data = await response.json();
        if (error_data.errors) {
          const backend_errors: FormErrors = {};
          error_data.errors.forEach((error: { field: string; message: string }) => {
            if (error.field === 'name') backend_errors.name = error.message;
            else if (error.field === 'email') backend_errors.email = error.message;
            else if (error.field === 'subject') backend_errors.subject = error.message;
            else if (error.field === 'message') backend_errors.message = error.message;
          });
          setErrors(backend_errors);
        } else {
          setMessage('Failed to send message. Please try again.');
          setMessageType('error');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-dark py-20 relative overflow-hidden">
      <div className="max-w-site mx-auto px-8 relative z-[2]">
        <h2 className="text-center text-[clamp(1.8rem,4.5vw,2.5rem)] font-extrabold text-white mb-3 leading-tight font-sans">
          Get in Touch
        </h2>
        <p className="text-center text-neutral-200 text-base mb-9 max-w-[560px] mx-auto">
          Have a question, feedback, or partnership idea? Send us a message and our team will reply soon.
        </p>
        <div className="flex justify-center items-center">
          <div className="bg-slate-50 p-8 rounded-2xl shadow-2xl border border-slate-200 max-w-[600px] w-full">
            <p className="text-slate-900 font-bold text-lg mb-1">Contact Form</p>
            <p className="text-slate-500 text-sm mb-5">Fill in the details below and press send.</p>

            {message && (
              <div
                className={`p-3 rounded-md mb-4 text-center font-medium text-sm ${
                  message_type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1.5 font-semibold text-slate-800 text-xs uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`contact_field w-full py-3 px-4 border rounded-xl text-base bg-white outline-none transition-all font-[inherit] ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter your name"
                  value={form_data.name}
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <div className="text-red-700 text-sm mt-1.5 flex items-center gap-1.5">
                    <Icon name="error" size={16} />
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-1.5 font-semibold text-slate-800 text-xs uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`contact_field w-full py-3 px-4 border rounded-xl text-base bg-white outline-none transition-all font-[inherit] ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter your email address"
                  value={form_data.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="text-red-700 text-sm mt-1.5 flex items-center gap-1.5">
                    <Icon name="error" size={16} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block mb-1.5 font-semibold text-slate-800 text-xs uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className={`contact_field w-full py-3 px-4 border rounded-xl text-base bg-white outline-none transition-all font-[inherit] ${
                    errors.subject ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter subject"
                  value={form_data.subject}
                  onChange={handleInputChange}
                />
                {errors.subject && (
                  <div className="text-red-700 text-sm mt-1.5 flex items-center gap-1.5">
                    <Icon name="error" size={16} />
                    {errors.subject}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block mb-1.5 font-semibold text-slate-800 text-xs uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className={`contact_field w-full py-3 px-4 border rounded-xl text-base bg-white outline-none transition-all font-[inherit] min-h-[140px] resize-y ${
                    errors.message ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter your message"
                  value={form_data.message}
                  onChange={handleInputChange}
                />
                {errors.message && (
                  <div className="text-red-700 text-sm mt-1.5 flex items-center gap-1.5">
                    <Icon name="error" size={16} />
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 px-7 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-white font-bold shadow-primary-md hover:from-primary-600 hover:to-violet-600 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer font-[inherit] mt-1"
                disabled={is_submitting}
              >
                <Icon name="paper-plane" size={16} style={{ marginRight: '8px' }} />
                {is_submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
