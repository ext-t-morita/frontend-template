"use server";

import type { InviteUserRequest, InviteUserResponse } from "@/types/api/auth";

export async function inviteUser(payload: InviteUserRequest): Promise<InviteUserResponse> {
  // TODO: wire real mailer / DB
  console.log("invite user (placeholder)", payload);
  return { ok: true, invitationId: "placeholder" };
}
