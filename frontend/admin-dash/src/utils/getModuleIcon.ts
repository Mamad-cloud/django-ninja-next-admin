import { ChartNoAxesCombined, Store, HelpCircle, Factory, UsersRound, MessageCircle, Megaphone, Receipt, LucideIcon } from "lucide-react"; 

export function getModuleIcon(name: string): LucideIcon {
    const _name = name.toLowerCase();
    switch (_name) {
        case 'sales':
            return ChartNoAxesCombined
        case 'products':
            return Store
        case 'chat':
            return MessageCircle
        case 'manufacturing':
            return Factory
        case 'employees':
            return UsersRound
        case 'marketing': 
            return Megaphone
        case 'invoices':
            return Receipt
        default:
            return HelpCircle // Fallback icon
    }
}