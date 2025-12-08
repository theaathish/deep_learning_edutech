import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export function CancellationsAndRefunds() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Cancellations and Refunds Policy</h1>
          <p className="text-muted-foreground">Last updated: December 2025</p>
        </div>

        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This policy governs refunds and cancellations for all course purchases on the eduTech platform.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Refund Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Refunds are eligible under the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Request is made within <strong>7 days</strong> of course enrollment</li>
                <li>Less than <strong>10% of course content</strong> has been accessed</li>
                <li>The course enrollment is valid and has not expired</li>
                <li>No certificates have been issued for the course</li>
              </ul>
              <p className="mt-4">
                Refunds will not be granted if the above conditions are not met.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Refund Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Step 1: Submit Refund Request</h4>
                <p>
                  Contact our support team at support@edutech.com with your order ID and reason for refund.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Step 2: Verification</h4>
                <p>
                  Our team will verify your refund request against our eligibility criteria. This typically takes 2-3 business days.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Step 3: Processing</h4>
                <p>
                  Once approved, your refund will be processed back to your original payment method. This may take an additional 5-7 business days depending on your bank.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Step 4: Confirmation</h4>
                <p>
                  You will receive an email confirmation once the refund has been successfully processed.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Course Access During Refund</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Once a refund request is approved:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Your course access will be revoked within <strong>24 hours</strong></li>
                <li>You will not be able to download course materials</li>
                <li>You will not be eligible for certificates</li>
                <li>All progress and assignments will be removed</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Non-Refundable Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The following are <strong>non-refundable</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Courses accessed for more than 10% of content</li>
                <li>Courses with issued certificates</li>
                <li>Subscription plans (after the initial refund window)</li>
                <li>Lifetime access courses (after 7 days)</li>
                <li>Course bundles where any course in the bundle has been accessed</li>
                <li>Refunds requested after 7 days of enrollment</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Course Cancellation</h4>
                <p>
                  You can cancel your course enrollment at any time. Upon cancellation, your access to the course will be removed, and no refund will be provided unless you fall within the refund eligibility window.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-foreground mb-2">Subscription Cancellation</h4>
                <p>
                  For subscription-based courses, you can cancel your subscription at any time. Your access will continue until the end of your current billing period. No prorated refunds are provided for mid-cycle cancellations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Refund for Free Trials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If a course is offered as a free trial:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>No refund is applicable as the course is free</li>
                <li>Access will be removed once the trial period ends</li>
                <li>You can enroll in the paid version after the trial ends</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Promotional and Discounted Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                For courses purchased with promotional codes or discounts:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Refunds are based on the discounted price paid</li>
                <li>No additional discount or credit is provided</li>
                <li>Refund eligibility remains the same as standard courses</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Exceptions and Special Cases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                In case of:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Course Discontinuation:</strong> Full refund will be provided</li>
                <li><strong>Technical Issues:</strong> Extensions may be granted; refunds considered case-by-case</li>
                <li><strong>Duplicate Payments:</strong> Full refund of duplicate amounts within 30 days</li>
                <li><strong>Fraudulent Transactions:</strong> Full refund and investigation initiated</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you believe a refund was denied incorrectly:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact our support team with detailed documentation</li>
                <li>Provide order ID, course details, and reason for dispute</li>
                <li>Our team will review and respond within 5 business days</li>
                <li>Further escalation available if needed</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact for Refunds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                To request a refund or for any questions about this policy:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@edutech.com<br />
                <strong>Response Time:</strong> Within 24-48 business hours<br />
                <strong>Include:</strong> Order ID, enrollment date, and reason for refund
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Policy Changes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting to the website. Your continued use of the platform constitutes acceptance of any changes to this policy.
              </p>
            </CardContent>
          </Card>

          <Alert className="border-amber-200 bg-amber-50 mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              For all refund-related inquiries, please ensure you have your order ID and course information available for faster processing.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
