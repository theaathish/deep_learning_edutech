import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Shipping Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2025</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Digital Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                eduTech is a digital education platform. All courses and educational materials are delivered digitally through our platform. There is no physical shipping involved.
              </p>
              <p>
                Upon enrollment in a course, you will have immediate access to course materials, including video lectures, assignments, resources, and interactive content through your student dashboard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Instant Access</h4>
                <p>
                  Most courses are available for immediate access after enrollment and payment confirmation. You will receive an email with your login credentials and course access information.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Course Launch</h4>
                <p>
                  Some courses may have scheduled launch dates. If a course is not yet live, you will be notified and can access it on the specified start date.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2">
                <li>Web browser access through our platform</li>
                <li>Mobile app (iOS/Android) for on-the-go learning</li>
                <li>Offline download options for selected content (where applicable)</li>
                <li>Lifetime access to course materials (non-refundable courses)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>To access courses, you need:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Stable internet connection (minimum 2 Mbps recommended)</li>
                <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                <li>Valid email address for login</li>
                <li>JavaScript enabled in your browser</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>Course materials may include:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Video lectures and tutorials</li>
                <li>PDF notes and handouts</li>
                <li>Interactive quizzes and assignments</li>
                <li>Practice problems and case studies</li>
                <li>Additional resources and reference materials</li>
                <li>Certificate upon course completion</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Upon successful completion of a course, you will receive a digital certificate that can be downloaded and shared. Certificates are issued in PDF format and may be printed as needed.
              </p>
              <p>
                Some courses may offer printable certificates that can be mailed upon request (if applicable, shipping costs may apply).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Duration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The duration of course access depends on your enrollment type:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Lifetime Access:</strong> Access to all course materials indefinitely</li>
                <li><strong>Limited Duration:</strong> Access available for the specified duration (e.g., 1 year, 6 months)</li>
                <li><strong>Subscription-based:</strong> Access as long as your subscription remains active</li>
              </ul>
              <p className="mt-4">
                Check the course details page to see the access duration for the specific course you're interested in.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support & Technical Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you experience any technical issues accessing course materials, please contact our support team:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email: support@edutech.com</li>
                <li>Response time: Within 24 hours</li>
              </ul>
              <p className="mt-4">
                We strive to resolve all technical issues promptly to ensure uninterrupted access to your courses.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Policy Changes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to update this shipping policy at any time. Changes will be notified to users via email or platform announcement. Continued use of the platform constitutes acceptance of any policy changes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
