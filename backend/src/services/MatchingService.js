class MatchingService {
  constructor() {
    // Weight configuration for different assessment types
    this.defaultWeights = {
      technical: 0.30,
      ethical: 0.25,
      creative: 0.15,
      ai_symbiosis: 0.20,
      psychometric: 0.10
    };
  }

  /**
   * Calculate overall matching score between candidate and position
   * @param {Object} assessmentResults - All assessment results for the application
   * @param {Object} position - Position requirements
   * @param {Object} weights - Custom weights for scoring (optional)
   * @returns {Object} - Matching analysis with scores and recommendations
   */
  calculateMatch(assessmentResults, position, weights = null) {
    const scoreWeights = weights || this.defaultWeights;
    let weightedScore = 0;
    let totalWeight = 0;
    const scoreBreakdown = {};
    const warnings = [];
    const strengths = [];

    // Process each assessment result
    for (const result of assessmentResults) {
      const weight = scoreWeights[result.assessment_type] || 0;
      const score = result.normalized_score || 0;
      
      scoreBreakdown[result.assessment_type] = {
        score,
        weight,
        weighted: score * weight
      };

      weightedScore += score * weight;
      totalWeight += weight;

      // Check minimum requirements
      this.checkMinimumRequirements(result, position, warnings, strengths);
    }

    // Normalize the final score
    const overallScore = totalWeight > 0 ? weightedScore / totalWeight : 0;

    // Generate risk assessment
    const riskFactors = this.assessRiskFactors(scoreBreakdown, position, assessmentResults);

    // Generate recommendation
    const recommendation = this.generateRecommendation(
      overallScore,
      warnings,
      strengths,
      riskFactors
    );

    return {
      overall_score: Math.round(overallScore * 100) / 100,
      score_breakdown: scoreBreakdown,
      warnings,
      strengths,
      risk_factors: riskFactors,
      recommendation,
      match_quality: this.getMatchQuality(overallScore)
    };
  }

  /**
   * Check if candidate meets minimum position requirements
   */
  checkMinimumRequirements(result, position, warnings, strengths) {
    switch (result.assessment_type) {
      case 'ethical':
        if (result.normalized_score < position.min_ethical_score) {
          warnings.push({
            type: 'ethical',
            message: `Ethical score (${result.normalized_score}) below minimum requirement (${position.min_ethical_score})`
          });
        } else if (result.normalized_score >= 90) {
          strengths.push({
            type: 'ethical',
            message: 'Exceptional ethical standards demonstrated'
          });
        }
        break;

      case 'creative':
        if (result.normalized_score < position.min_creativity_score) {
          warnings.push({
            type: 'creative',
            message: `Creativity score (${result.normalized_score}) below minimum requirement (${position.min_creativity_score})`
          });
        }
        break;

      case 'ai_symbiosis':
        const requiredLevel = position.ai_collaboration_level || 5;
        const candidateLevel = Math.round(result.normalized_score / 10);
        if (candidateLevel < requiredLevel) {
          warnings.push({
            type: 'ai_symbiosis',
            message: `AI collaboration level (${candidateLevel}) below requirement (${requiredLevel})`
          });
        } else if (candidateLevel >= requiredLevel + 2) {
          strengths.push({
            type: 'ai_symbiosis',
            message: 'Advanced AI collaboration skills'
          });
        }
        break;
    }
  }

  /**
   * Assess risk factors based on assessment results
   */
  assessRiskFactors(scoreBreakdown, position, assessmentResults) {
    const risks = [];

    // High turnover risk for critical locations
    if (['Constellation', 'Anahuac'].includes(position.location)) {
      if (scoreBreakdown.ethical?.score < 80 || scoreBreakdown.psychometric?.score < 70) {
        risks.push({
          level: 'high',
          type: 'turnover',
          description: 'High turnover risk location with suboptimal scores'
        });
      }
    }

    // AI adoption risk
    if (position.ai_collaboration_level >= 7 && scoreBreakdown.ai_symbiosis?.score < 70) {
      risks.push({
        level: 'medium',
        type: 'technology',
        description: 'Position requires high AI collaboration but candidate shows limited proficiency'
      });
    }

    // Leadership risk for supervisory positions
    if (position.hierarchy_level === 'supervisor' || position.hierarchy_level === 'directive') {
      const leadershipAssessment = assessmentResults.find(r => 
        r.tool_name === 'leadership_assessment'
      );
      if (!leadershipAssessment || leadershipAssessment.normalized_score < 75) {
        risks.push({
          level: 'medium',
          type: 'leadership',
          description: 'Leadership capabilities below recommended level for position'
        });
      }
    }

    return risks;
  }

  /**
   * Generate final recommendation based on all factors
   */
  generateRecommendation(overallScore, warnings, strengths, riskFactors) {
    const criticalWarnings = warnings.filter(w => 
      ['ethical', 'technical'].includes(w.type)
    );
    const highRisks = riskFactors.filter(r => r.level === 'high');

    if (criticalWarnings.length > 0 || highRisks.length > 0) {
      return {
        decision: 'not_recommended',
        summary: 'Candidate does not meet critical requirements',
        action: 'Consider for other positions or reject'
      };
    }

    if (overallScore >= 85 && warnings.length === 0) {
      return {
        decision: 'highly_recommended',
        summary: 'Excellent match with strong potential',
        action: 'Fast-track hiring process'
      };
    }

    if (overallScore >= 70) {
      return {
        decision: 'recommended',
        summary: 'Good match with manageable development areas',
        action: 'Proceed with structured onboarding plan'
      };
    }

    if (overallScore >= 60 && strengths.length > 0) {
      return {
        decision: 'conditional',
        summary: 'Potential match with significant development needs',
        action: 'Consider with enhanced training program'
      };
    }

    return {
      decision: 'not_recommended',
      summary: 'Insufficient match for position requirements',
      action: 'Consider for other positions'
    };
  }

  /**
   * Get match quality label
   */
  getMatchQuality(score) {
    if (score >= 90) return 'exceptional';
    if (score >= 80) return 'excellent';
    if (score >= 70) return 'good';
    if (score >= 60) return 'fair';
    return 'poor';
  }

  /**
   * Calculate cultural fit score based on ethical and psychometric assessments
   */
  calculateCulturalFit(assessmentResults) {
    const ethicalResult = assessmentResults.find(r => r.assessment_type === 'ethical');
    const psychometricResult = assessmentResults.find(r => r.assessment_type === 'psychometric');

    if (!ethicalResult || !psychometricResult) {
      return null;
    }

    // Extract specific cultural indicators
    const culturalFactors = {
      teamwork: (ethicalResult.empathy_score || 0) * 0.4,
      integrity: (ethicalResult.integrity_score || 0) * 0.3,
      adaptability: (psychometricResult.details?.adaptability || 0) * 0.3
    };

    const culturalFitScore = Object.values(culturalFactors).reduce((a, b) => a + b, 0);

    return {
      score: Math.round(culturalFitScore),
      factors: culturalFactors,
      interpretation: culturalFitScore >= 80 ? 'strong' : culturalFitScore >= 60 ? 'moderate' : 'weak'
    };
  }
}

module.exports = new MatchingService();