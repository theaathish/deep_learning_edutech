import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: December 2025</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                By accessing and using the eduTech platform ("Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Permission is granted to temporarily download one copy of the materials (information or software) from the eduTech Platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the Platform</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                <li>Violating any applicable laws or regulations</li>
                <li>Harassing or causing distress or inconvenience to any person</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Account Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                To use certain features of the Platform, you must register and create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate, complete, and current information during registration</li>
                <li>Maintain the confidentiality of your password</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Not use the Platform under false pretenses or as an imposter</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Payment and Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Pricing</h4>
                <p>
                  All course prices are displayed in Indian Rupees (INR) unless otherwise specified. Prices are subject to change without notice, but such changes will not affect purchases already made.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Payment Processing</h4>
                <p>
                  Payments are processed securely through Razorpay, our authorized payment gateway. All credit card and payment information is handled by Razorpay and is subject to their privacy and security policies.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Billing</h4>
                <p>
                  You authorize us to charge your payment method for the course enrollment. You will receive a receipt via email after successful payment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                All course materials, including but not limited to video lectures, notes, assignments, and resources, are the intellectual property of eduTech or the course instructors and are protected by copyright law.
              </p>
              <p>
                You are granted a non-exclusive, non-transferable license to use the course materials for your personal educational purposes only. Any reproduction, distribution, or transmission of the materials without prior written consent is prohibited.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. User Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you submit, post, or display content on the Platform (including comments, assignments, or discussions), you grant eduTech a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute such content.
              </p>
              <p>
                You represent and warrant that you own or have the necessary rights to the content you submit and that it does not violate any third-party rights or applicable laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The materials on eduTech's Platform are provided "as is." eduTech makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Limitations of Liability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                In no event shall eduTech or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on eduTech's Platform, even if eduTech or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Accuracy of Materials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The materials appearing on eduTech's Platform could include technical, typographical, or photographic errors. eduTech does not warrant that any of the materials on its Platform are accurate, complete, or current. eduTech may make changes to the materials contained on its Platform at any time without notice.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                eduTech has not reviewed all of the sites linked to its Platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by eduTech of the site. Use of any such linked website is at the user's own risk.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                eduTech may revise these terms of service for its Platform at any time without notice. By using this Platform, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Governing Law</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Bangalore.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>13. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> support@edutech.com<br />
                <strong>Address:</strong> Bangalore, India
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
