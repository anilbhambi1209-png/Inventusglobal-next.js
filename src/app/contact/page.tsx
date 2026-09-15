"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  ExternalLink,
} from "lucide-react";
import { siteConfig, servicesList } from "@/config/site";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How quickly can you launch our marketing campaigns?",
      a: "For Google Ads and Meta campaigns, we complete research, tracking setup, and ad copywriting within 5 to 7 business days. Custom Next.js web applications take 3 to 4 weeks.",
    },
    {
      q: "Do you require long-term lock-in contracts?",
      a: "No. We operate on flexible monthly agreements with a simple 30-day notice period. We believe client retention should be earned every month through performance.",
    },
    {
      q: "How often will we receive performance updates?",
      a: "You get 24/7 live access to a transparent Looker Studio dashboard, plus regular strategy calls with your dedicated growth architect to review qualified leads and ROAS.",
    },
    {
      q: "Can we visit your office for an in-person discussion?",
      a: `Absolutely! We welcome clients to our corporate office at ${siteConfig.address.full}. Feel free to book an appointment or visit during business hours (Mon–Sat: 10:00 AM – 7:30 PM).`,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrap">
      {/* Clean & Simple Header */}
      <section className="contact-hero-section">
        <div className="container">
          <div className="contact-hero-content">
            <span className="section-tag">Let&apos;s Talk</span>
            <h1 className="contact-hero-title">
              Get in Touch with <span className="gradient-text">Inventus Global</span>
            </h1>
            <p className="contact-hero-desc">
              Have a question or looking to scale your business? Drop us a line below or reach out directly on WhatsApp. We typically respond within 2 to 4 business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section: Form + Contact Info */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-main-grid">
            {/* Left Column: Simple, Frictionless Form */}
            <div className="contact-form-card">
              <div className="contact-form-header">
                <h2 className="contact-form-title">Send a Message</h2>
                <p className="contact-form-subtitle">
                  Fill in these quick details and our team will get right back to you.
                </p>
              </div>

              {submitted ? (
                <div className="contact-success-state">
                  <div className="contact-success-icon-wrap">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="contact-success-title">Message Sent!</h3>
                  <p className="contact-success-desc">
                    Thank you, <strong>{name}</strong>! We have received your note and will get back to you at <strong>{email}</strong> or <strong>{phone}</strong> shortly.
                  </p>

                  <div className="contact-success-actions">
                    <a
                      href={siteConfig.contact.whatsappLink(
                        `Hi Inventus Global, my name is ${name}${service ? ` interested in ${service}` : ""}. I just submitted the contact form. Let's connect!`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-success-wa-btn"
                    >
                      <MessageCircle size={18} />
                      <span>Chat on WhatsApp Directly</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setPhone("");
                        setService("");
                        setMessage("");
                      }}
                      className="contact-success-reset-btn"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form-body">
                  {/* Name and Phone Row */}
                  <div className="contact-form-row">
                    <div className="contact-field-group">
                      <label htmlFor="contact-name" className="contact-label">
                        Your Name <span className="text-orange">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="e.g. Rahul Mehta"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="contact-input"
                        required
                      />
                    </div>

                    <div className="contact-field-group">
                      <label htmlFor="contact-phone" className="contact-label">
                        Phone / WhatsApp <span className="text-orange">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder={siteConfig.contact.primaryPhone}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="contact-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Email & Service Required Row */}
                  <div className="contact-form-row">
                    <div className="contact-field-group">
                      <label htmlFor="contact-email" className="contact-label">
                        Email Address <span className="text-orange">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="rahul@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="contact-input"
                        required
                      />
                    </div>

                    <div className="contact-field-group">
                      <label htmlFor="contact-service" className="contact-label">
                        Service Required <span className="text-orange">*</span>
                      </label>
                      <select
                        id="contact-service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="contact-select"
                        required
                      >
                        <option value="">Select a service...</option>
                        {servicesList.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="contact-field-group">
                    <label htmlFor="contact-message" className="contact-label">
                      How can we help? <span className="contact-optional">(Optional)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Tell us briefly about your business, current goals, or what services you need..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="contact-textarea"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="contact-submit-btn">
                    <span>Send Message</span>
                    <ArrowRight size={18} className="contact-submit-arrow" />
                  </button>

                  <div className="contact-form-privacy">
                    <Shield size={14} className="text-orange" />
                    <span>We respect your privacy. No spam, ever.</span>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Direct Channels & Office Info */}
            <div className="contact-side-col">
              {/* WhatsApp Quick Connect Card */}
              <div className="contact-wa-card">
                <div className="contact-wa-header">
                  <div className="contact-wa-icon-box">
                    <MessageCircle size={24} />
                  </div>
                  <div className="contact-wa-meta">
                    <div className="contact-wa-status">
                      <span className="contact-wa-dot" />
                      <span>Online &amp; Quick Response</span>
                    </div>
                    <h3 className="contact-wa-title">Chat on WhatsApp</h3>
                  </div>
                </div>

                <p className="contact-wa-desc">
                  Prefer a quick chat? Message us directly on WhatsApp for immediate answers to your queries.
                </p>

                <a
                  href={siteConfig.contact.whatsappLink(
                    "Hi Inventus Global, I would like to know more about your services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-wa-action-btn"
                >
                  <MessageCircle size={18} />
                  <span>Message {siteConfig.contact.primaryPhone}</span>
                </a>
              </div>

              {/* Office Details Card */}
              <div className="contact-info-card">
                <h3 className="contact-info-title">Vashi Headquarters</h3>
                <p className="contact-info-sub">Inventus Global Office</p>

                <div className="contact-info-list">
                  <div className="contact-info-item">
                    <MapPin size={18} className="contact-info-icon" />
                    <div className="contact-info-text">
                      {siteConfig.address.office},<br />
                      {siteConfig.address.landmark},<br />
                      {siteConfig.address.locality}, {siteConfig.address.region} {siteConfig.address.postalCode}
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Phone size={18} className="contact-info-icon" />
                    <div className="contact-info-text">
                      <a href={`tel:${siteConfig.contact.primaryPhoneRaw}`} className="contact-info-link">
                        {siteConfig.contact.primaryPhone}
                      </a>
                      <span className="contact-info-sep">•</span>
                      <a href={`tel:${siteConfig.contact.secondaryPhoneRaw}`} className="contact-info-link">
                        {siteConfig.contact.secondaryPhone}
                      </a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Mail size={18} className="contact-info-icon" />
                    <div className="contact-info-text">
                      <a href={`mailto:${siteConfig.contact.email}`} className="contact-info-link">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <Clock size={18} className="contact-info-icon" />
                    <div className="contact-info-text">
                      {siteConfig.hours.days}: {siteConfig.hours.time}
                    </div>
                  </div>
                </div>

                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-directions-btn"
                >
                  <span>Get Directions on Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Compact Map Card */}
              <div className="contact-map-card">
                <iframe
                  title="Inventus Global Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.822827103289!2d73.00346387588147!3d19.071527852119857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1395982ab11%3A0x7d6f5f3089d71ad6!2sSatra%20Plaza%2C%20Sector%2019D%2C%20Vashi%2C%20Navi%20Mumbai%2C%20Maharashtra%20400703!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                  width="100%"
                  height="170"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="contact-map-iframe"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean FAQ Section */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="contact-faq-header">
            <span className="section-tag">FAQ</span>
            <h2 className="contact-faq-title">Frequently Asked Questions</h2>
            <p className="contact-faq-desc">
              Quick answers about working with Inventus Global.
            </p>
          </div>

          <div className="contact-faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`contact-faq-card ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="contact-faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="contact-faq-q-text">{faq.q}</span>
                    <span className="contact-faq-q-icon">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="contact-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
