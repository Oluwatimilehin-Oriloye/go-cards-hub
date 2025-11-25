import { useState } from "react";
import { Filter } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";
import { PhysicalCardTimeline } from "@/components/notifications/PhysicalCardTimeline";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { NotificationDetailsModal } from "@/components/notifications/NotificationDetailsModal";
import { TrackingDetailsModal } from "@/components/notifications/TrackingDetailsModal";
import { ClearNotificationsModal } from "@/components/notifications/ClearNotificationsModal";

export interface TimelineEvent {
  id: string;
  type: "created" | "funded" | "linked" | "transaction_attempted" | "transaction_success" | "transaction_failed" | "frozen" | "unfrozen" | "deleted";
  title: string;
  description: string;
  timestamp: string;
  cardName?: string;
  amount?: number;
  merchant?: string;
  referenceId?: string;
  status: "success" | "failed" | "pending" | "warning";
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "success" | "error" | "warning";
  cardName?: string;
  amount?: number;
  referenceId?: string;
}

export default function Notifications() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [clearModalOpen, setClearModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <TopNav />
        
        <main className="p-6 space-y-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notifications & Tracking</h1>
              <p className="text-muted-foreground mt-1">
                Monitor card activity and track card events in real time.
              </p>
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Physical Card Timeline Section */}
          <PhysicalCardTimeline onStepClick={setSelectedEvent} />

          {/* Notifications List */}
          <NotificationsList 
            onNotificationClick={setSelectedNotification}
            onClearAll={() => setClearModalOpen(true)}
          />
        </main>
      </div>

      {/* Modals */}
      <NotificationDetailsModal
        open={selectedNotification !== null}
        onOpenChange={(open) => !open && setSelectedNotification(null)}
        notification={selectedNotification}
      />

      <TrackingDetailsModal
        open={selectedEvent !== null}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
        event={selectedEvent}
      />

      <ClearNotificationsModal
        open={clearModalOpen}
        onOpenChange={setClearModalOpen}
      />
    </div>
  );
}
