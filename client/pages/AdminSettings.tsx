import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { toast } from "@/components/ui/use-toast";
import { 
  Settings, 
  Shield, 
  Users, 
  Mail, 
  Globe, 
  Database, 
  Bell,
  Key,
  Lock,
  UserCog,
  MessageSquare,
  Truck
} from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "Bus नियोजक",
    siteDescription: "Nepal's leading bus booking platform",
    adminEmail: "admin@busniyojak.com",
    supportEmail: "support@busniyojak.com",
    enableRegistrations: true,
    enableBookings: true,
    requireEmailVerification: true,
    enableNotifications: true,
    maintenanceMode: false,
    maxBookingsPerUser: 5,
    bookingCancellationHours: 2,
    commissionRate: 5,
    autoApproveOperators: false,
    enableRatings: true,
    minRatingToDisplay: 3,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireSpecialChars: true,
    maxLoginAttempts: 5,
    blockDuration: 15,
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Updated",
      description: "Security configuration has been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Settings</h1>
          <p className="text-gray-600">Manage system configuration and security settings</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Booking
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure basic site information and branding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveSettings}>Save General Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure authentication and security policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-600">Require 2FA for admin accounts</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings({ 
                        ...securitySettings, 
                        sessionTimeout: parseInt(e.target.value) 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Min Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => setSecuritySettings({ 
                        ...securitySettings, 
                        passwordMinLength: parseInt(e.target.value) 
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({ 
                        ...securitySettings, 
                        maxLoginAttempts: parseInt(e.target.value) 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="blockDuration">Block Duration (minutes)</Label>
                    <Input
                      id="blockDuration"
                      type="number"
                      value={securitySettings.blockDuration}
                      onChange={(e) => setSecuritySettings({ 
                        ...securitySettings, 
                        blockDuration: parseInt(e.target.value) 
                      })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Require Special Characters</Label>
                    <p className="text-sm text-gray-600">Passwords must contain special characters</p>
                  </div>
                  <Switch
                    checked={securitySettings.requireSpecialChars}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({ ...securitySettings, requireSpecialChars: checked })
                    }
                  />
                </div>

                <Button onClick={handleSaveSecurity}>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  User Management Settings
                </CardTitle>
                <CardDescription>
                  Configure user registration and account policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable User Registrations</Label>
                    <p className="text-sm text-gray-600">Allow new users to register accounts</p>
                  </div>
                  <Switch
                    checked={settings.enableRegistrations}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, enableRegistrations: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Require Email Verification</Label>
                    <p className="text-sm text-gray-600">Users must verify email before booking</p>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, requireEmailVerification: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Auto-approve Bus Operators</Label>
                    <p className="text-sm text-gray-600">Automatically approve new operator registrations</p>
                  </div>
                  <Switch
                    checked={settings.autoApproveOperators}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, autoApproveOperators: checked })
                    }
                  />
                </div>

                <Button onClick={handleSaveSettings}>Save User Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="booking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Booking Configuration
                </CardTitle>
                <CardDescription>
                  Configure booking policies and restrictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Bookings</Label>
                    <p className="text-sm text-gray-600">Allow users to make bus bookings</p>
                  </div>
                  <Switch
                    checked={settings.enableBookings}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, enableBookings: checked })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="maxBookings">Max Bookings per User</Label>
                    <Input
                      id="maxBookings"
                      type="number"
                      value={settings.maxBookingsPerUser}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        maxBookingsPerUser: parseInt(e.target.value) 
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cancellationHours">Cancellation Hours</Label>
                    <Input
                      id="cancellationHours"
                      type="number"
                      value={settings.bookingCancellationHours}
                      onChange={(e) => setSettings({ 
                        ...settings, 
                        bookingCancellationHours: parseInt(e.target.value) 
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%)</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={settings.commissionRate}
                    onChange={(e) => setSettings({ 
                      ...settings, 
                      commissionRate: parseFloat(e.target.value) 
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Ratings & Reviews</Label>
                    <p className="text-sm text-gray-600">Allow users to rate and review trips</p>
                  </div>
                  <Switch
                    checked={settings.enableRatings}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, enableRatings: checked })
                    }
                  />
                </div>

                <Button onClick={handleSaveSettings}>Save Booking Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable System Notifications</Label>
                    <p className="text-sm text-gray-600">Send system alerts and updates</p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, enableNotifications: checked })
                    }
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Booking Confirmations</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Send confirmation emails for new bookings</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Payment Reminders</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Remind users about pending payments</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Trip Reminders</span>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Send reminders before departure</p>
                  </div>
                </div>

                <Button onClick={handleSaveSettings}>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Settings
                </CardTitle>
                <CardDescription>
                  Configure system maintenance and advanced options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Put the site in maintenance mode</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, maintenanceMode: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Version</div>
                      <div className="font-semibold">v2.1.0</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Last Updated</div>
                      <div className="font-semibold">Dec 20, 2024</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Database Status</div>
                      <div className="font-semibold text-green-600">Connected</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600">Server Status</div>
                      <div className="font-semibold text-green-600">Online</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">Danger Zone</h3>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-red-800">Reset All Settings</div>
                        <div className="text-sm text-red-600">This will reset all settings to default values</div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Reset Settings
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveSettings}>Save System Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
