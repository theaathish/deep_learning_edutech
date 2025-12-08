import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2025</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                eduTech ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing and using eduTech, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                <p>We may collect personal information including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Name and email address</li>
                  <li>Phone number</li>
                  <li>Date of birth</li>
                  <li>Postal address</li>
                  <li>Payment information (handled by Razorpay)</li>
                  <li>Educational background</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-2">Automatically Collected Information</h4>
                <p>We automatically collect certain information about your device and usage, including:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring/exit pages</li>
                  <li>Device identifiers</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-2">Course Interaction Data</h4>
                <p>We collect information about your interactions with our platform, including:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Courses enrolled in</li>
                  <li>Video viewing history and duration</li>
                  <li>Quiz and assignment submissions</li>
                  <li>Completion status</li>
                  <li>Discussion forum participation</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Use of Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Processing course enrollments and payments</li>
                <li>Sending you educational materials and course updates</li>
                <li>Communicating with you about your account or course</li>
                <li>Responding to your inquiries and customer support requests</li>
                <li>Sending promotional emails and newsletters (with your consent)</li>
                <li>Personalizing your learning experience</li>
                <li>Analyzing usage patterns to improve our platform</li>
                <li>Detecting, preventing, and addressing fraudulent activity</li>
                <li>Complying with legal obligations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Disclosure of Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may disclose your information in the following situations:
              </p>
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-2">Service Providers</h4>
                <p>
                  We may share information with third-party service providers who assist us in operating our website and conducting our business, including payment processors like Razorpay, email service providers, and analytics services.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-2">Legal Requirements</h4>
                <p>
                  We may disclose your information when required by law or when we believe in good faith that disclosure is necessary to protect our rights or comply with a legal obligation.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-2">Business Transfers</h4>
                <p>
                  If eduTech is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be part of that transaction. We will provide notice before your information becomes subject to a different privacy policy.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We use cookies, web beacons, and similar technologies to enhance your experience and collect usage data. Cookies help us:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Remember your login information</li>
                <li>Understand your preferences</li>
                <li>Track your browsing patterns</li>
                <li>Measure the effectiveness of our marketing</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser preferences. However, disabling cookies may affect the functionality of our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Security of Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We implement appropriate technical and organizational measures designed to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>SSL encryption for data transmission</li>
                <li>Secure password storage using encryption</li>
                <li>Limited access to personal information</li>
                <li>Regular security audits</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Right to Access:</strong> You can request access to the personal information we hold about you</li>
                <li><strong>Right to Correction:</strong> You can request correction of inaccurate or incomplete information</li>
                <li><strong>Right to Deletion:</strong> You can request deletion of your personal information</li>
                <li><strong>Right to Data Portability:</strong> You can request a copy of your information in a portable format</li>
                <li><strong>Right to Opt-Out:</strong> You can opt-out of marketing communications at any time</li>
                <li><strong>Right to Object:</strong> You can object to certain processing of your information</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at support@edutech.com with your request.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our platform is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information and terminate the child's account.
              </p>
              <p>
                For users between 13-18, parental consent may be required for certain services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Marketing Communications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may send you promotional emails, newsletters, or other marketing communications. You can opt-out of receiving these communications at any time by:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Clicking the "unsubscribe" link in any marketing email</li>
                <li>Updating your preferences in your account settings</li>
                <li>Contacting us at support@edutech.com with your request</li>
              </ul>
              <p className="mt-4">
                Please note that even if you opt-out of marketing communications, we may still send you transactional emails related to your account or course enrollment.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Our platform may contain links to third-party websites and services that are not operated by us. This Privacy Policy does not apply to third-party websites, and we are not responsible for their privacy practices. We recommend reviewing the privacy policies of any third-party services before providing your information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. The retention period may vary depending on the type of information and the context of processing.
              </p>
              <p>
                You can request deletion of your information at any time, subject to legal obligations and legitimate business purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you are accessing our platform from outside India, your information may be transferred to, stored in, and processed in India. By using our platform, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules than your country.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>13. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@edutech.com<br />
                <strong>Address:</strong> Bangalore, India<br />
                <strong>Response Time:</strong> Within 10 business days
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>14. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or by posting the updated policy on our website. Your continued use of our platform after any changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
