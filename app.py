import re
from datetime import datetime
from typing import Dict, List

from flask import Flask, jsonify, render_template, request
from flask_cors import CORS


app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)


@app.get("/")
def index():
    return render_template("index.html")


@app.post("/analyze")
def analyze():
    data = request.get_json(silent=True) or {}
    component = (data.get("component") or "").strip()

    if not component:
        return jsonify({"error": "Missing required field: component"}), 400

    result = generate_analysis(component)
    return jsonify(result)


def generate_analysis(component_name: str) -> Dict[str, List[str]]:
    """Generate structured analysis for a UI component using rule-based prompt chaining.

    This mimics a prompt-chaining pipeline with four stages: understanding, risks, prevention, checklist.
    """
    normalized = component_name.lower()

    understanding_points = _step_component_understanding(normalized, component_name)
    risk_points = _step_risk_identification(normalized)
    suggestions_points = _step_preventative_strategies(normalized)
    checklist_points = _step_developer_checklist(normalized, understanding_points, risk_points, suggestions_points)

    return {
        "component": component_name,
        "generatedAt": datetime.utcnow().isoformat() + "Z",
        "keyPoints": understanding_points,
        "whatIfs": risk_points,
        "suggestions": suggestions_points,
        "checklist": checklist_points,
    }


def _step_component_understanding(normalized: str, original: str) -> List[str]:
    key_points: List[str] = [
        f"Purpose: Define what the {original} must achieve and how success is measured.",
        "Primary flows: map the top 3 user tasks and required screens/states.",
        "Core UI: inputs, buttons, navigation, validation, empty/error/loading states.",
        "Data needs: APIs, local state, caching, and optimistic update strategy.",
        "Accessibility: keyboard navigation, focus order, labels/ARIA, contrast.",
        "Performance: perceived speed, skeletons/spinners, network resilience.",
        "Security/privacy: input handling, PII, authz/authn, logging/redaction.",
    ]

    specializations = _specialization_points_understanding(normalized)
    return key_points + specializations


def _step_risk_identification(normalized: str) -> List[str]:
    risks: List[str] = [
        "Validation gaps allow invalid inputs or unclear error recovery.",
        "Edge states (empty, slow network, offline, rate limits) are not handled.",
        "Accessibility regressions: missing labels, low contrast, poor focus traps.",
        "State sync issues between client cache and server responses.",
        "Overfetching or N+1 requests causing slow time-to-interactive.",
        "Unclear affordances or copy causing user hesitation or misclicks.",
        "Security lapses: CSRF, XSS via unescaped content, verbose error leaks.",
    ]

    risks += _specialization_points_risks(normalized)
    return risks


def _step_preventative_strategies(normalized: str) -> List[str]:
    suggestions: List[str] = [
        "Define acceptance criteria and success metrics for each primary flow.",
        "Use schema-based validation on both client and server.",
        "Design empty, error, and loading states with clear next actions.",
        "Instrument analytics and logs for key events and error reasons.",
        "Adopt accessibility checklist (WAI-ARIA), test with keyboard/screen readers.",
        "Introduce retries with backoff, timeouts, and idempotent endpoints.",
        "Threat model: sanitize inputs/outputs, minimize PII, enforce rate limits.",
    ]

    suggestions += _specialization_points_suggestions(normalized)
    return suggestions


def _step_developer_checklist(
    normalized: str,
    understanding_points: List[str],
    risk_points: List[str],
    suggestions_points: List[str],
) -> List[str]:
    checklist: List[str] = [
        "Write the top 3 user flows as high-level tests.",
        "Implement schema validation and user-friendly error messages.",
        "Cover empty/loading/error/timeout/retry states.",
        "Add keyboard navigation and focus management; verify contrast.",
        "Log key events and failures; add observability dashboards.",
        "Review auth, permissions, and data exposure.",
        "Add performance budgets; verify on slow 3G and low-end devices.",
    ]

    checklist += _specialization_points_checklist(normalized)
    return checklist


def _match(normalized: str, *keywords: str) -> bool:
    pattern = r"|".join(re.escape(k) for k in keywords)
    return re.search(pattern, normalized) is not None


def _specialization_points_understanding(normalized: str) -> List[str]:
    points: List[str] = []

    if _match(normalized, "login", "sign in", "authenticate", "auth"):
        points += [
            "Flows: credential login, social SSO, forgot password, lockout recovery.",
            "UI: email/username field, password field, show/hide toggle, remember me, submit, error messaging.",
            "Security: rate limiting, account lock thresholds, brute-force detection.",
        ]

    if _match(normalized, "signup", "register", "sign up"):
        points += [
            "Flows: email verification, password creation, terms consent, welcome/onboarding.",
            "UI: password strength meter, progressive disclosure for optional fields.",
        ]

    if _match(normalized, "password", "reset", "recovery"):
        points += [
            "Flows: request reset, token validation, new password set, success confirmation.",
            "Security: token TTL, one-time use, device/session invalidation.",
        ]

    if _match(normalized, "checkout", "payment", "cart"):
        points += [
            "Flows: cart review, address/shipping, payment entry, confirmation, receipt.",
            "UI: totals, taxes, discounts, failed payment recovery, 3DS flows.",
        ]

    if _match(normalized, "search", "filter", "query"):
        points += [
            "Flows: query entry, suggestions, results, no-results, refinement, pagination.",
            "UI: debounced input, recent searches, filters, sort, highlighting.",
        ]

    if _match(normalized, "profile", "settings", "preferences"):
        points += [
            "Flows: view, edit, save, cancel, discard confirmation, audit trail.",
            "UI: form sections, inline validation, avatar upload/crop.",
        ]

    if _match(normalized, "table", "grid", "list"):
        points += [
            "Flows: load, sort, filter, paginate, select, bulk actions.",
            "UI: empty state, column management, sticky headers, responsive layout.",
        ]

    if _match(normalized, "upload", "file"):
        points += [
            "Flows: select file(s), validation, progress, success/failure, retry.",
            "UI: drag-and-drop, size/type constraints, antivirus/scanning feedback.",
        ]

    if _match(normalized, "calendar", "date", "schedule"):
        points += [
            "Flows: pick date/time, range selection, timezone handling, recurrence.",
            "UI: keyboard navigation, localization, disabled dates.",
        ]

    if _match(normalized, "map", "location", "geo"):
        points += [
            "Flows: search location, select pin, geocode/reverse-geocode, permissions.",
            "UI: zoom, pan, clustering, fallback when geolocation denied.",
        ]

    if _match(normalized, "chat", "message", "messaging"):
        points += [
            "Flows: compose, send, read receipts, typing indicators, offline queue.",
            "UI: infinite scroll, attachment preview, moderation/reporting hooks.",
        ]

    return points


def _specialization_points_risks(normalized: str) -> List[str]:
    risks: List[str] = []

    if _match(normalized, "login", "authenticate", "auth"):
        risks += [
            "Account enumeration via distinct error messages.",
            "Weak password policy or absent MFA challenge.",
            "Session fixation or missing same-site cookies.",
        ]

    if _match(normalized, "signup", "register"):
        risks += [
            "Disposable emails bypass verification and pollute data.",
            "CAPTCHA missing leading to bot signups.",
        ]

    if _match(normalized, "password", "reset"):
        risks += [
            "Reset links not single-use or long-lived tokens.",
            "No audit trail for credential changes.",
        ]

    if _match(normalized, "checkout", "payment", "cart"):
        risks += [
            "Race conditions on inventory or price changes at pay time.",
            "Payment declines without actionable recovery.",
            "PCI scope creep by storing sensitive PAN data.",
        ]

    if _match(normalized, "search"):
        risks += [
            "Overeager queries causing rate limiting or cost spikes.",
            "Unhelpful no-results state leading to user dead ends.",
        ]

    if _match(normalized, "table", "grid", "list"):
        risks += [
            "Large datasets freeze the UI due to lack of virtualization.",
            "Selection state lost across pagination.",
        ]

    if _match(normalized, "upload", "file"):
        risks += [
            "Oversized or malicious files not blocked server-side.",
            "Uploads fail on flaky connections without resumability.",
        ]

    if _match(normalized, "calendar", "date"):
        risks += [
            "Timezone and DST shifts corrupt event times.",
            "Localization mismatches on date formats.",
        ]

    if _match(normalized, "map", "location"):
        risks += [
            "Geolocation permissions denied with no fallback.",
            "High API costs due to unbounded map tile requests.",
        ]

    if _match(normalized, "chat", "message"):
        risks += [
            "Unmoderated content leads to abuse or policy violations.",
            "Message duplication from retries without idempotency.",
        ]

    return risks


def _specialization_points_suggestions(normalized: str) -> List[str]:
    suggestions: List[str] = []

    if _match(normalized, "login", "authenticate", "auth"):
        suggestions += [
            "Normalize auth errors and avoid revealing whether an account exists.",
            "Support optional MFA and backup codes; throttle attempts.",
            "Use HttpOnly, Secure, SameSite cookies for sessions.",
        ]

    if _match(normalized, "signup", "register"):
        suggestions += [
            "Verify email before activation; block disposable domains.",
            "Add adaptive CAPTCHA after suspicious patterns.",
        ]

    if _match(normalized, "password", "reset"):
        suggestions += [
            "Issue single-use, short-lived tokens and invalidate on use.",
            "Trigger global sign-out after password change.",
        ]

    if _match(normalized, "checkout", "payment", "cart"):
        suggestions += [
            "Lock prices/inventory for a short window during payment.",
            "Provide clear decline reasons and retry options; support 3DS.",
            "Use a PCI-compliant provider with tokenization.",
        ]

    if _match(normalized, "search"):
        suggestions += [
            "Debounce input and cache recent queries; add typo tolerance.",
            "Design helpful no-results with suggestions and broadened filters.",
        ]

    if _match(normalized, "table", "grid", "list"):
        suggestions += [
            "Adopt windowed rendering and server-side pagination.",
            "Persist selection and column preferences.",
        ]

    if _match(normalized, "upload", "file"):
        suggestions += [
            "Validate file type/size server-side; scan for malware.",
            "Use chunked uploads with resumable support and ETags.",
        ]

    if _match(normalized, "calendar", "date"):
        suggestions += [
            "Store timestamps in UTC; render in local TZ with clear labels.",
            "Use robust libraries for recurrence and DST handling.",
        ]

    if _match(normalized, "map", "location"):
        suggestions += [
            "Gracefully degrade when geolocation denied; allow manual search.",
            "Set sensible rate limits and cache tiles/requests.",
        ]

    if _match(normalized, "chat", "message"):
        suggestions += [
            "Add content moderation and abuse reporting hooks.",
            "Make message sends idempotent with client-generated IDs.",
        ]

    return suggestions


def _specialization_points_checklist(normalized: str) -> List[str]:
    checklist: List[str] = []

    if _match(normalized, "login", "authenticate", "auth"):
        checklist += [
            "Lockout thresholds, attempt throttling, and MFA flows covered.",
            "Consistent error copy that avoids account enumeration.",
        ]

    if _match(normalized, "signup", "register"):
        checklist += [
            "Email verification and CAPTCHA flows tested.",
        ]

    if _match(normalized, "password", "reset"):
        checklist += [
            "Single-use token with TTL; sessions invalidated after change.",
        ]

    if _match(normalized, "checkout", "payment", "cart"):
        checklist += [
            "3DS and decline recovery covered; PCI boundaries documented.",
        ]

    if _match(normalized, "search"):
        checklist += [
            "Debounced queries, no-results UX, and analytics events in place.",
        ]

    if _match(normalized, "table", "grid", "list"):
        checklist += [
            "Virtualization and server pagination implemented; a11y for tables.",
        ]

    if _match(normalized, "upload", "file"):
        checklist += [
            "Server-side validation and resumable uploads verified.",
        ]

    if _match(normalized, "calendar", "date"):
        checklist += [
            "UTC storage; timezone rendering and DST edges tested.",
        ]

    if _match(normalized, "map", "location"):
        checklist += [
            "Fallback flows when geolocation denied and cost controls set.",
        ]

    if _match(normalized, "chat", "message"):
        checklist += [
            "Moderation, rate limits, and idempotent send paths tested.",
        ]

    return checklist


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)