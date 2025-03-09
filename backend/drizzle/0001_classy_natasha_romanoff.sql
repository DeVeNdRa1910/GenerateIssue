ALTER TABLE "Employee" DROP CONSTRAINT "Employee_adminId_Admin_id_fk";
--> statement-breakpoint
ALTER TABLE "issue" DROP CONSTRAINT "issue_employeeId_Employee_id_fk";
--> statement-breakpoint
ALTER TABLE "Admin" ALTER COLUMN "employeeIds" SET DEFAULT ARRAY[]::integer[];--> statement-breakpoint
ALTER TABLE "issue" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "issue" ALTER COLUMN "status" SET DEFAULT 'Pending';--> statement-breakpoint
ALTER TABLE "issue" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_adminId_Admin_id_fk" FOREIGN KEY ("adminId") REFERENCES "public"."Admin"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "issue" ADD CONSTRAINT "issue_employeeId_Employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE set null ON UPDATE no action;