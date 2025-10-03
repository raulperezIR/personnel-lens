import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export interface Subscription {
  id: string;
  platform: string;
  plan: string;
  startDate: string;
  endDate: string;
  amount: string;
  status: 'activa' | 'caducada';
}

interface SubscriptionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscription?: Subscription | null;
  onSave: (subscription: Subscription) => void;
}

export const SubscriptionModal = ({ open, onOpenChange, subscription, onSave }: SubscriptionModalProps) => {
  const [formData, setFormData] = useState<Subscription>({
    id: "",
    platform: "",
    plan: "",
    startDate: "",
    endDate: "",
    amount: "",
    status: "activa"
  });

  useEffect(() => {
    if (subscription) {
      setFormData(subscription);
    } else {
      setFormData({
        id: Date.now().toString(),
        platform: "",
        plan: "",
        startDate: "",
        endDate: "",
        amount: "",
        status: "activa"
      });
    }
  }, [subscription, open]);

  const handleSubmit = () => {
    if (!formData.platform || !formData.plan || !formData.startDate || !formData.endDate || !formData.amount) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos requeridos.",
        variant: "destructive"
      });
      return;
    }

    onSave(formData);
    onOpenChange(false);
    toast({
      title: subscription ? "Suscripción actualizada" : "Suscripción creada",
      description: subscription 
        ? "La suscripción se ha actualizado correctamente." 
        : "La suscripción se ha creado correctamente."
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {subscription ? "Editar Suscripción" : "Nueva Suscripción"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="platform">Plataforma *</Label>
            <Input
              id="platform"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              placeholder="Ej: Netflix, HBO Max, Disney+"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan">Plan *</Label>
            <Input
              id="plan"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              placeholder="Ej: Premium, Estándar, Básico"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha Inicio *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Fecha Caducidad *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Importe (€) *</Label>
            <Input
              id="amount"
              type="text"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Ej: 15,99"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Estado *</Label>
            <Select
              value={formData.status}
              onValueChange={(value: 'activa' | 'caducada') => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activa">Activa</SelectItem>
                <SelectItem value="caducada">Caducada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary-600">
            {subscription ? "Guardar" : "Crear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
