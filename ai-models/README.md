# 🤰 Materna AI – Conversational & Visual Support Engine

This folder contains the AI components powering **Materna’s** pregnancy support system. We use multimodal large language models (LLMs) to provide empathetic, medically cautious responses and support visual symptom checking — all while prioritizing user privacy.

---

## 🧠 LLM: Llama-3-Vision-11B on Together.ai

We use **Llama-3-Vision-11B**, hosted via [Together.ai](https://www.together.ai/), to power both text and image-based queries.

### ✅ Why Llama-3-Vision-11B?
- **Multimodal Support**: Accepts both text and images (`<image>rash.jpg</image> + 'It’s itchy and warm.'`)
- **Fast + Free**: 100 queries/hour on free tier (~1.8s avg response time)
- **8K Context Window**: Handles detailed patient history & symptom chains
- **Reliable**: Balanced tradeoff between speed, cost, and model size

---


### 🚨 SOS Symptoms Checker  
Designed for quick self-assessment of common and urgent pregnancy-related symptoms. Users describe how they’re feeling, and Materna provides calm, evidence-based guidance — including a gentle push to contact a healthcare provider when red flags appear.

- Rules + AI hybrid engine for triage
- Clear, supportive phrasing (no alarms or dismissals)
- Recognizes medical emergencies (bleeding, fetal movement, etc.)

  ---

## 🧬 MaternaBot Persona & System Prompt

MaternaBot is a warm, calm, supportive virtual companion. It delivers empathetic, evidence-based information while encouraging users to consult healthcare providers for personal concerns.

### 🔐 System Prompt Summary
- Non-diagnostic, non-prescriptive
- Emotionally validating and supportive
- Encourages professional consultation for red flag or emergency symptoms
- Harm-reduction-oriented for sensitive disclosures (e.g., substance use)
- Short, clear responses using non-judgmental language

---

## 🖼️ Visual Symptom Checker (upcoming!)

Materna supports secure image uploads to analyze visual symptoms like rashes or swelling. We ensure **zero raw image leakage** through client-side encryption:

### 🔒 Image Encryption Workflow
1. User uploads a photo via the web interface.
2. In-browser encryption using **AES-GCM (256-bit)** with a random key + IV via Web Crypto API.
3. Encrypted image + IV sent to backend via HTTPS.
4. AES key is encrypted using server's public key (e.g., Azure Key Vault).
5. Backend stores encrypted image and encrypted key securely.
6. Decryption happens only in isolated AI inference environments during training or live prediction.

This ensures images are never transmitted or stored in plaintext, maintaining strict user privacy.

---
