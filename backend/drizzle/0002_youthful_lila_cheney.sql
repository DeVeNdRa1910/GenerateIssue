ALTER TABLE "issue" DROP CONSTRAINT "issue_employeeId_Employee_id_fk";
--> statement-breakpoint
ALTER TABLE "issue" ADD CONSTRAINT "issue_employeeId_Employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."Employee"("id") ON DELETE cascade ON UPDATE no action;